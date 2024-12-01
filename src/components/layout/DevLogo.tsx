'use client'

import { motion } from 'framer-motion'

export function DevLogo() {
    return (
        <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="font-mono group"
        >
            <div className="flex items-center space-x-1">
                <span className="text-[#0366d6] dark:text-[#58a6ff]">&lt;</span>
                <motion.span
                    className="text-lg font-semibold text-[#24292e] dark:text-[#c9d1d9]"
                    whileHover={{ y: -1 }}
                >
                    Miloš
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#0366d6] dark:text-[#58a6ff] group-hover:text-[#2ea44f] dark:group-hover:text-[#238636] transition-colors"
                >
                    .dev
                </motion.span>
                <span className="text-[#0366d6] dark:text-[#58a6ff]">/&gt;</span>
            </div>
        </motion.div>
    )
}