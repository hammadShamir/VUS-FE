import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'secondary' | 'white'
}

export function Spinner({ size = 'md', color = 'primary' }: SpinnerProps) {
    return (
        <Loader2
            className={cn(
                "animate-spin",
                {
                    'w-4 h-4': size === 'sm',
                    'w-6 h-6': size === 'md',
                    'w-12 h-12': size === 'lg',
                },
                {
                    'text-primary': color === 'primary',
                    'text-secondary': color === 'secondary',
                    'text-white': color === 'white',
                }
            )}
        />
    )
}

