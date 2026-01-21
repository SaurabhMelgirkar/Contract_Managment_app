import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-xs font-bold text-surface-500 uppercase tracking-widest ml-1 select-none">
                        {label}
                    </label>
                )}
                <div className="relative group">

                    <input
                        ref={ref}
                        className={cn(
                            "flex h-12 w-full rounded-2xl border-none bg-surface-100/50 px-4 py-3 text-sm ring-1 ring-surface-200 transition-all font-medium placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white shadow-sm",
                            error && "ring-red-500 focus:ring-red-500 bg-red-50/50",
                            className
                        )}
                        {...props}
                    />
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                </div>
                {error && (
                    <p className="text-xs text-red-500 font-medium ml-1 animate-slide-up">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
