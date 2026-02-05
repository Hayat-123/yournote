import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="relative">
                <FileText className="h-7 w-7 text-orange-500" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">YourNote</span>
        </div>
    )
}

export const LogoIcon = ({ className }: { className?: string }) => {
    return (
        <FileText className={cn('h-6 w-6 text-orange-500', className)} strokeWidth={2.5} />
    )
}
