import { Mail, MapPin } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { FadeInView } from '../animations/FadeInView'
import { ContactForm } from './ContactForm'
import { CONTACT_EMAIL, LOCATION_ADDRESS, SOCIAL_LINKS } from '@/lib/constants'

export function Contact() {
    return (
        <section className="relative section-spacing">
            <Container className="max-w-6xl">
                <SectionHeader
                    title="Get in Touch"
                    subtitle="Open to conversations about AI product engineering, integrations and interesting projects."
                />

                <div className="grid max-w-5xl gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
                    <FadeInView delay={0.1} className="space-y-6 sm:space-y-8">
                        <div className="group touch-accent-group flex items-start gap-4">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Location</h3>
                                <p className="accent-text-hover mt-1 text-sm text-muted-foreground">
                                    {LOCATION_ADDRESS}
                                </p>
                            </div>
                        </div>

                        <div className="group touch-accent-group flex items-start gap-4">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Email</h3>
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="accent-hover-text mt-1 inline-block break-all text-sm text-muted-foreground"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </div>
                        </div>

                        <div className="group touch-accent-group flex items-start gap-4">
                            <span className="mt-0.5 text-sm text-muted-foreground">in</span>
                            <div>
                                <h3 className="text-sm font-medium text-foreground">LinkedIn</h3>
                                <a
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="accent-hover-text mt-1 inline-block text-sm text-muted-foreground"
                                >
                                    {SOCIAL_LINKS.linkedin}
                                </a>
                            </div>
                        </div>

                        <div className="group touch-accent-group flex items-start gap-4">
                            <span className="mt-0.5 text-sm text-muted-foreground">Git</span>
                            <div>
                                <h3 className="text-sm font-medium text-foreground">GitHub</h3>
                                <a
                                    href={SOCIAL_LINKS.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="accent-hover-text mt-1 inline-block text-sm text-muted-foreground"
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
