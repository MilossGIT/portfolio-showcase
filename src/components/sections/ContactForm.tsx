'use client'

import { useState, useRef } from 'react'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/Button'

type FormElements = {
    name: HTMLInputElement
    email: HTMLInputElement
    message: HTMLTextAreaElement
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
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error ?? 'Failed to send message.')
            }

            setIsSubmitted(true)
            form.reset()
        } catch (err: unknown) {
            console.error('Error sending email:', err)
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
            <div className="surface-card rounded-lg p-6 sm:p-8 text-center py-10">
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
                        rows={5}
                        className={inputClass}
                        placeholder="How can I help you?"
                        disabled={isSubmitting}
                    />
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm" role="alert">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{error}</span>
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
