import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('container mx-auto w-full min-w-0 max-w-6xl', className)}
            {...props}
        />
    )
)
Container.displayName = 'Container'

export { Container }