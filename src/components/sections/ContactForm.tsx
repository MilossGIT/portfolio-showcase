'use client'

import { useState, useRef } from 'react'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { CONTACT_EMAIL } from '@/lib/constants'

type FormElements = {
    name: HTMLInputElement
    email: HTMLInputElement
    message: HTMLTextAreaElement
    b_website: HTMLInputElement
}

const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors'

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const form = event.currentTarget
            const elements = form.elements as unknown as FormElements

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: elements.name.value,
                    email: elements.email.value,
                    message: elements.message.value,
                    b_website: elements.b_website.value,
                }),
            })

            const data = await response.json().catch(() => ({}))

            if (!response.ok) {
                throw new Error(data.error ?? 'Failed to send message.')
            }

            setIsSubmitted(true)
            form.reset()
        } catch (err: unknown) {
            console.error('Error sending message:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to send message. Please try again or contact directly via email.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div
                className="surface-card rounded-lg p-6 sm:p-8 text-center py-10"
                role="status"
                aria-live="polite"
            >
                <h3 className="text-lg font-medium text-foreground mb-2">
                    Thanks for reaching out!
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                    I&apos;ll get back to you as soon as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="primary">
                    Send another message
                </Button>
            </div>
        )
    }

    return (
        <div className="surface-card rounded-lg p-5 sm:p-7">
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 sm:space-y-5">
                {/* Honeypot field - visually hidden, excluded from tab order & assistive technology */}
                <div
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none select-none h-0 w-0 overflow-hidden"
                >
                    <label htmlFor="b_website">Leave this field blank</label>
                    <input
                        type="text"
                        id="b_website"
                        name="b_website"
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        maxLength={100}
                        autoComplete="name"
                        className={inputClass}
                        placeholder="Your name"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        maxLength={120}
                        autoComplete="email"
                        className={inputClass}
                        placeholder="you@example.com"
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-1.5"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        minLength={5}
                        maxLength={2000}
                        rows={5}
                        className={inputClass}
                        placeholder="How can I help you?"
                        disabled={isSubmitting}
                    />
                </div>

                {error && (
                    <div
                        className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400 text-sm"
                        role="alert"
                        aria-live="polite"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                        <div className="flex-1">
                            <p>{error}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                You can also email me directly at{' '}
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="text-foreground underline underline-offset-2 hover:text-emerald-400 transition-colors"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                    variant="primary"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Sending message...</span>
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            <span>Send Message</span>
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}
