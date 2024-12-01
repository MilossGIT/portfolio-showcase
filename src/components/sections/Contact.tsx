'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { CONTACT_EMAIL, PHONE_NUMBER } from '@/lib/constants'
import { emailConfig, validateEmailConfig } from '@/lib/email-config'

type FormElements = {
    name: HTMLInputElement
    email: HTMLInputElement
    message: HTMLTextAreaElement
}

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

            const templateParams = {
                user_name: elements.name.value,
                user_email: elements.email.value,
                message: elements.message.value,
            }

            await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                templateParams,
                emailConfig.publicKey
            )

            setIsSubmitted(true)
            form.reset()
        } catch (error: any) {
            console.error('Error sending email:', error)
            setError(error?.message || 'Failed to send message. Please try again or contact directly via email.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="relative py-24 sm:py-32 bg-[#ffffff] dark:bg-[#0d1117]">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-[#24292e] dark:text-[#c9d1d9]"
                        >
                            Get in Touch
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-lg text-[#586069] dark:text-[#8b949e]"
                        >
                            I'm always open to new opportunities and interesting projects.
                            Feel free to reach out!
                        </motion.p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <Card className="group hover:border-[#0366d6] dark:hover:border-[#58a6ff] transition-colors">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="p-3 rounded-lg bg-[#f1f8ff] dark:bg-[#1f6feb]/10 group-hover:bg-[#0366d6]/20 dark:group-hover:bg-[#1f6feb]/20 transition-colors">
                                        <Mail className="h-6 w-6 text-[#0366d6] dark:text-[#58a6ff]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#24292e] dark:text-[#c9d1d9]">Email</h3>
                                        <a
                                            href={`mailto:${CONTACT_EMAIL}`}
                                            className="text-[#0366d6] dark:text-[#58a6ff] hover:underline"
                                        >
                                            {CONTACT_EMAIL}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:border-[#0366d6] dark:hover:border-[#58a6ff] transition-colors">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="p-3 rounded-lg bg-[#f1f8ff] dark:bg-[#1f6feb]/10 group-hover:bg-[#0366d6]/20 dark:group-hover:bg-[#1f6feb]/20 transition-colors">
                                        <Phone className="h-6 w-6 text-[#0366d6] dark:text-[#58a6ff]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#24292e] dark:text-[#c9d1d9]">Phone</h3>
                                        <a
                                            href={`tel:${PHONE_NUMBER}`}
                                            className="text-[#0366d6] dark:text-[#58a6ff] hover:underline"
                                        >
                                            {PHONE_NUMBER}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:border-[#0366d6] dark:hover:border-[#58a6ff] transition-colors">
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div className="p-3 rounded-lg bg-[#f1f8ff] dark:bg-[#1f6feb]/10 group-hover:bg-[#0366d6]/20 dark:group-hover:bg-[#1f6feb]/20 transition-colors">
                                        <MapPin className="h-6 w-6 text-[#0366d6] dark:text-[#58a6ff]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#24292e] dark:text-[#c9d1d9]">Location</h3>
                                        <p className="text-[#586069] dark:text-[#8b949e]">
                                            Bratovševa Ploščad 38<br />
                                            Ljubljana, 1000<br />
                                            Slovenia
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <Card className="p-6">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <h3 className="text-xl font-semibold text-[#24292e] dark:text-[#c9d1d9] mb-2">
                                        Thanks for reaching out!
                                    </h3>
                                    <p className="text-[#586069] dark:text-[#8b949e] mb-8">
                                        I'll get back to you as soon as possible.
                                    </p>
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="primary"
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[#24292e] dark:text-[#c9d1d9] mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            className="w-full rounded-md border border-[#e1e4e8] bg-white dark:border-[#30363d] dark:bg-[#0d1117] px-4 py-2 text-[#24292e] dark:text-[#c9d1d9] focus:border-[#0366d6] dark:focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#0366d6] dark:focus:ring-[#58a6ff] transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[#24292e] dark:text-[#c9d1d9] mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="w-full rounded-md border border-[#e1e4e8] bg-white dark:border-[#30363d] dark:bg-[#0d1117] px-4 py-2 text-[#24292e] dark:text-[#c9d1d9] focus:border-[#0366d6] dark:focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#0366d6] dark:focus:ring-[#58a6ff] transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-[#24292e] dark:text-[#c9d1d9] mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            required
                                            rows={5}
                                            className="w-full rounded-md border border-[#e1e4e8] bg-white dark:border-[#30363d] dark:bg-[#0d1117] px-4 py-2 text-[#24292e] dark:text-[#c9d1d9] focus:border-[#0366d6] dark:focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#0366d6] dark:focus:ring-[#58a6ff] transition-colors"
                                            placeholder="Your message here..."
                                        />
                                    </div>
                                    {error && (
                                        <div className="rounded-md bg-[#ffeef0] dark:bg-[#ff000022] p-4 flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-[#d73a49] dark:text-[#ff6b6b] flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-[#d73a49] dark:text-[#ff6b6b]">{error}</p>
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
                        </Card>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}