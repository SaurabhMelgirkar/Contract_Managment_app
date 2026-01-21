import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("glass-panel rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5", className)} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-8 border-b border-surface-100/50", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn("text-xl font-bold text-surface-900 leading-none tracking-tight font-heading", className)} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-8", className)} {...props}>
            {children}
        </div>
    );
}
