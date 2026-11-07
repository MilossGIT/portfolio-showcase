import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'
import { ContactForm } from './ContactForm'
import { CONTACT_EMAIL, LOCATION_ADDRESS, SOCIAL_LINKS } from '@/lib/constants'

export function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-heading" className="relative section-spacing scroll-mt-16">
            <Container className="max-w-6xl">
                <SectionHeader
                    id="contact-heading"
                    title="Get in Touch"
                    subtitle="Open to conversations about AI product engineering, integrations and interesting projects."
                />

                <div className="grid max-w-5xl gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
                    <FadeInView delay={0.1} className="space-y-6 sm:space-y-8">
                        <div className="group touch-accent-group flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Location</h3>
                                <p className="accent-text-hover mt-1 text-sm text-muted-foreground">
                                    {LOCATION_ADDRESS}
                                </p>
                            </div>
                        </div>

                        <div className="group touch-accent-group flex items-start gap-4">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Email</h3>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="accent-hover-text mt-1 inline-block break-all text-sm text-muted-foreground"
                                    aria-label={`Send email to ${CONTACT_EMAIL}`}
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </div>
                        </div>

                        <div className="group touch-accent-group flex items-start gap-4">
                            <Linkedin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">LinkedIn</h3>
                                <a
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="accent-hover-text mt-1 inline-block text-sm text-muted-foreground"
                                    aria-label="LinkedIn profile"
                                >
                                    {SOCIAL_LINKS.linkedin}
                                </a>
                            </div>
                        </div>

                        <div className="group touch-accent-group flex items-start gap-4">
                            <Github className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">GitHub</h3>
                                <a
                                    href={SOCIAL_LINKS.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="accent-hover-text mt-1 inline-block text-sm text-muted-foreground"
                                    aria-label="GitHub profile"
                                >
                                    {SOCIAL_LINKS.github}
                                </a>
                            </div>
                        </div>
                    </FadeInView>

                    <FadeInView delay={0.2}>
                        <ContactForm />
                    </FadeInView>
                </div>
            </Container>
        </section>
    )
}
