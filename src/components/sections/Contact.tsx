'use client'

import { useState, useRef } from 'react'
import { Mail, MapPin, Send, Loader2, AlertCircle } from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'
import { CONTACT_EMAIL } from '@/lib/constants'

type FormElements = {
    name: HTMLInputElement
    email: HTMLInputElement
    message: HTMLTextAreaElement
}

const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors'

export function Contact() {
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

    return (
        <section className="relative py-24 sm:py-32">
            <Container className="max-w-6xl">
                <SectionHeader
                    title="Get in Touch"
                    subtitle="I'm always open to new opportunities and interesting projects. Feel free to reach out!"
                />

                <div className="grid gap-12 md:grid-cols-2 max-w-5xl">
                    <FadeInView delay={0.1} className="space-y-8">
                        <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Email</h3>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1 inline-block"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Location</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Ljubljana, 1000
                                    <br />
                                    Slovenia
                                </p>
                            </div>
                        </div>
                    </FadeInView>

                    <FadeInView delay={0.2}>
                        <div className="surface-card rounded-lg p-6">
                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    Thanks for reaching out!
                                </h3>
                                <p className="text-muted-foreground mb-8 text-sm">
                                    I&apos;ll get back to you as soon as possible.
                                </p>
                                <Button onClick={() => setIsSubmitted(false)} variant="primary">
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className={inputClass}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className={inputClass}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-foreground mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        rows={5}
                                        className={inputClass}
                                        placeholder="Your message here..."
                                    />
                                </div>
                                {error && (
                                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                        <p className="text-sm text-destructive">{error}</p>
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                        </div>
                    </FadeInView>
                </div>
            </Container>
        </section>
    )
}
