import { NextResponse } from 'next/server'
import { CONTACT_EMAIL } from '@/lib/constants'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const name = String(body.name ?? '').trim()
        const email = String(body.email ?? '').trim()
        const message = String(body.message ?? '').trim()

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
        }

        if (message.length > 5000) {
            return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
        }

        const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                message,
                _subject: `Portfolio message from ${name}`,
                _captcha: 'false',
                _template: 'table',
            }),
        })

        const data = await response.json().catch(() => ({}))

        if (!response.ok || data.success !== 'true' && data.success !== true) {
            console.error('FormSubmit error:', data)
            return NextResponse.json(
                {
                    error:
                        'Failed to send message. Please try again or contact directly via email.',
                },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Contact API error:', error)
        return NextResponse.json(
            {
                error:
                    'Failed to send message. Please try again or contact directly via email.',
            },
            { status: 500 }
        )
    }
}
