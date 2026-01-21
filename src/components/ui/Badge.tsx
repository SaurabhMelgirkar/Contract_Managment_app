import React from 'react';
import { cn } from '../../utils/cn';
import type { ContractStatus } from '../../types';

interface BadgeProps {
    status?: ContractStatus;
    children?: React.ReactNode;
    variant?: 'default' | 'outline';
    className?: string;
}

const statusStyles: Record<ContractStatus, string> = {
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    created: 'bg-brand-50 text-brand-700 border-brand-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    sent: 'bg-blue-50 text-blue-700 border-blue-200',
    signed: 'bg-purple-50 text-purple-700 border-purple-200',
    locked: 'bg-slate-100 text-slate-500 border-slate-200 line-through',
    revoked: 'bg-red-50 text-red-700 border-red-200',
};

export function Badge({ status, children, className }: BadgeProps) {
    const content = children || status;
    const style = status ? statusStyles[status] : 'bg-slate-100 text-slate-800';

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
            style,
            className
        )}>
            {content && String(content).charAt(0).toUpperCase() + String(content).slice(1)}
        </span>
    );
}
