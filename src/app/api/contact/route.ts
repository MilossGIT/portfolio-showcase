import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

// ============================================================================
// 1. In-Memory Token Bucket / Sliding Window Rate Limiter (Serverless Fallback)
// Note: For multi-region edge rate limiting on Vercel Pro/Enterprise, see WAF docs.
// ============================================================================
interface RateLimitRecord {
    count: number
    resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5 // max 5 submissions per 10 minutes per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now()

    // Periodic cleanup of expired entries
    if (rateLimitMap.size > 500) {
        for (const [key, value] of rateLimitMap.entries()) {
            if (now > value.resetTime) {
                rateLimitMap.delete(key)
            }
        }
    }

    const record = rateLimitMap.get(ip)
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
        return false
    }

    if (record.count >= MAX_REQUESTS) {
        return true
    }

    record.count += 1
    return false
}

function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }
    return request.headers.get('x-real-ip') || 'unknown-client'
}

// ============================================================================
// 2. HTML Entity Escaping & Injection Protection
// ============================================================================
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

// ============================================================================
// 3. Zod Server-Side Schema
// ============================================================================
const ContactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(100, 'Name must be 100 characters or fewer'),
    email: z
        .string()
        .trim()
        .email('Invalid email address')
        .max(120, 'Email must be 120 characters or fewer'),
    message: z
        .string()
        .trim()
        .min(5, 'Message must be at least 5 characters')
        .max(2000, 'Message must be 2000 characters or fewer'),
    b_website: z.string().optional(),
})

// ============================================================================
// 4. Contact Route Handler
// ============================================================================
export async function POST(request: Request) {
    const clientIp = getClientIp(request)

    // Code-level IP rate limiting
    if (isRateLimited(clientIp)) {
        console.warn(`[Contact API] Rate limit hit for IP: ${clientIp}`)
        return NextResponse.json(
            {
                error: 'Too many requests. Please wait a few minutes before trying again.',
            },
            {
                status: 429,
                headers: { 'Retry-After': '600' },
            }
        )
    }

    let rawBody: unknown
    try {
        rawBody = await request.json()
    } catch {
        return NextResponse.json(
            { error: 'Invalid request payload.' },
            { status: 400 }
        )
    }

    // Server-side Zod validation
    const parsed = ContactSchema.safeParse(rawBody)
    if (!parsed.success) {
        console.warn('[Contact API] Validation error:', parsed.error.flatten().fieldErrors)
        return NextResponse.json(
            { error: 'Please check your inputs and try again.' },
            { status: 400 }
        )
    }

    const { name, email, message, b_website } = parsed.data

    // Honeypot check: if filled, return 200 OK immediately without sending
    if (b_website && b_website.trim().length > 0) {
        console.warn(`[Contact API] Honeypot triggered from IP: ${clientIp}`)
        return NextResponse.json({ success: true })
    }

    // Strip newlines from name & subject to prevent email header injection
    const sanitizedName = name.replace(/[\r\n]+/g, ' ').trim()
    const subject = `Portfolio message from ${sanitizedName}`.replace(/[\r\n]+/g, ' ').trim()

    // Environment configuration
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'
    const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'minicm034@gmail.com'

    // If API key is missing (e.g. local dev without key), log and return success
    if (!resendApiKey) {
        console.warn(
            '[Contact API] RESEND_API_KEY not configured. Simulating successful send in local development.',
            { from: fromEmail, to: toEmail, replyTo: email, subject, sanitizedName }
        )
        return NextResponse.json({ success: true })
    }

    try {
        const resend = new Resend(resendApiKey)
        const result = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            replyTo: email,
            subject: subject,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #111;">
                    <h2 style="font-size: 18px; margin-bottom: 16px; border-bottom: 1px solid #eaeaea; padding-bottom: 8px;">
                        New Contact Form Submission
                    </h2>
                    <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
                    <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                    <p style="margin: 6px 0;"><strong>IP:</strong> ${escapeHtml(clientIp)}</p>
                    <div style="margin-top: 20px;">
                        <strong>Message:</strong>
                        <div style="margin-top: 8px; padding: 12px; background: #f7f7f7; border-radius: 6px; white-space: pre-wrap;">
                            ${escapeHtml(message)}
                        </div>
                    </div>
                </div>
            `,
            text: `Name: ${sanitizedName}\nEmail: ${email}\nIP: ${clientIp}\n\nMessage:\n${message}`,
        })

        if (result.error) {
            console.error('[Contact API] Resend sending error:', result.error)
            return NextResponse.json(
                {
                    error: 'Unable to send your message right now. Please email directly.',
                },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[Contact API] Unexpected error delivering email:', error)
        return NextResponse.json(
            {
                error: 'Unable to send your message right now. Please email directly.',
            },
            { status: 500 }
        )
    }
}
