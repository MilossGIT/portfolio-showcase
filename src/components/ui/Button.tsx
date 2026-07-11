import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-primary text-primary-foreground hover:opacity-90 shadow-sm':
                            variant === 'primary',
                        'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border':
                            variant === 'default',
                        'border border-border bg-transparent hover:bg-muted text-foreground':
                            variant === 'outline',
                        'hover:bg-muted text-foreground': variant === 'ghost',
                        'h-10 px-4 py-2': size === 'default',
                        'h-9 px-3 text-sm': size === 'sm',
                        'h-11 px-5 text-sm sm:px-8 sm:text-base': size === 'lg',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
