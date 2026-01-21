import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-lg shadow-brand-500/30 border-t border-white/20',
            secondary: 'bg-white text-surface-700 hover:bg-surface-50 border border-surface-200 shadow-sm',
            outline: 'border-2 border-surface-200 bg-transparent hover:border-brand-300 hover:bg-brand-50/50 text-surface-600 active:bg-brand-50',
            ghost: 'bg-transparent hover:bg-surface-100 text-surface-600 hover:text-surface-900',
            danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/30',
        };

        const sizes = {
            sm: 'h-9 px-3 text-xs rounded-lg',
            md: 'h-11 px-6 text-sm rounded-xl',
            lg: 'h-14 px-8 text-base rounded-2xl',
            icon: 'h-11 w-11 p-0 flex items-center justify-center rounded-xl',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
