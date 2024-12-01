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
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0366d6] disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-[#2ea44f] text-white hover:bg-[#2c974b] border border-[#2ea44f]/10':
                            variant === 'primary',
                        'bg-[#fafbfc] text-[#24292e] hover:bg-[#f3f4f6] border border-[#e1e4e8] dark:bg-[#21262d] dark:text-[#c9d1d9] dark:hover:bg-[#30363d] dark:border-[#30363d]':
                            variant === 'default',
                        'border border-[#e1e4e8] bg-transparent hover:bg-[#f3f4f6] dark:border-[#30363d] dark:hover:bg-[#30363d]':
                            variant === 'outline',
                        'hover:bg-[#f3f4f6] dark:hover:bg-[#30363d]': variant === 'ghost',
                        'h-10 px-4 py-2': size === 'default',
                        'h-9 rounded-md px-3': size === 'sm',
                        'h-11 rounded-md px-8': size === 'lg',
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