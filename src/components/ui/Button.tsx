import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  default:
    'bg-[var(--surface)] text-[var(--text)] hairline hover:border-[var(--accent)] hover:text-[var(--accent)] px-3.5 py-2',
  accent:
    'bg-[var(--accent-solid)] text-[var(--accent-fg)] px-3.5 py-2 hover:opacity-90',
  ghost:
    'bg-transparent text-[var(--muted)] hover:text-[var(--text)] px-2 py-1.5',
  link: 'bg-transparent text-[var(--accent)] underline-offset-4 hover:underline px-0 py-0',
} as const

type Variant = keyof typeof variants

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <a
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  ),
)
LinkButton.displayName = 'LinkButton'
