
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';

export function Header() {
    const location = useLocation();

    const getTitle = () => {
        switch (true) {
            case location.pathname === '/': return 'Overview';
            case location.pathname.startsWith('/blueprints'): return 'Blueprint Studio';
            case location.pathname.startsWith('/create-contract'): return 'New Agreement';
            case location.pathname.startsWith('/contracts'): return 'Contract Details';
            default: return 'Contract Management';
        }
    };

    return (
        <header className="h-20 flex items-center justify-between px-8 bg-white/40 sticky top-0 z-20 backdrop-blur-sm border-b border-white/40">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-surface-500 hover:bg-white/50 rounded-lg">
                    <Menu className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-surface-900 tracking-tight font-heading">{getTitle()}</h1>
                    <p className="text-xs text-surface-500 font-medium">Welcome back, John</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-focus-within:text-brand-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search contracts, clients..."
                        className="pl-11 pr-4 py-2.5 rounded-2xl border-none bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white w-72 transition-all shadow-sm placeholder:text-surface-400"
                    />
                </div>

                <div className="h-8 w-[1px] bg-surface-200 hidden md:block"></div>

                <button className="p-3 text-surface-500 hover:text-brand-600 hover:bg-white rounded-xl transition-all relative group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-accent-500 rounded-full border border-white group-hover:animate-ping"></span>
                    <span className="absolute top-3 right-3 w-2 h-2 bg-accent-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
