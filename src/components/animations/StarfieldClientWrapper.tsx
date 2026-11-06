'use client'

import dynamic from 'next/dynamic'

const DynamicStarfield = dynamic(
    () => import('./StarfieldWarp').then((mod) => mod.StarfieldWarp),
    { ssr: false }
)

export function StarfieldClientWrapper() {
    return <DynamicStarfield />
}
