'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
    text: string
    delay?: number
    className?: string
}

export default function TextReveal({ text, delay = 0, className = '' }: TextRevealProps) {
    const characters = Array.from(text)

    return (
        <div className={`inline-flex overflow-hidden ${className}`}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * 0.03,
                        ease: "easeOut"
                    }}
                    className={char === ' ' ? 'mr-2' : undefined}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    )
}