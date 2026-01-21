import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Sidebar() {
    return (
        <div className="w-72 glass-sidebar flex flex-col h-full shadow-2xl z-20 relative">
            <div className="p-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                    <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-100 font-heading block">
                        Contract<span className="font-light text-brand-200">Flow</span>
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Overview" />
                <NavItem to="/blueprints" icon={<FileText size={20} />} label="Blueprints" />
                <NavItem to="/create-contract" icon={<PlusCircle size={20} />} label="New Contract" />
            </nav>

            <div className="p-6">
                <div className="glass-panel border-white/10 bg-white/5 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-400 to-accent-400 p-[2px]">
                        <div className="w-full h-full rounded-full bg-surface-900 flex items-center justify-center font-bold text-xs text-white">JD</div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white group-hover:text-brand-100 transition-colors">John Doe</p>
                        <p className="text-xs text-slate-400">Action Required</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                isActive
                    ? "text-white shadow-glow bg-gradient-to-r from-brand-600/20 to-accent-600/20 border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
        >
            {({ isActive }) => (
                <>
                    <div className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110", isActive && "text-brand-300")}>
                        {icon}
                    </div>
                    <span className="relative z-10">{label}</span>
                    {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-400 to-accent-500 rounded-r-full" />
                    )}
                </>
            )}
        </NavLink>
    );
}
