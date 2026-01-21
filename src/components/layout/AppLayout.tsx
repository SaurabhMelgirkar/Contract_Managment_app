
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
    return (
        <div className="flex h-screen w-full bg-surface-50 font-sans overflow-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-200/30 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-200/30 blur-[120px]" />
            </div>

            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden relative z-10 glass-panel border-l border-white/40 shadow-none rounded-l-3xl my-3 mr-3 bg-white/60 backdrop-blur-md">
                <Header />
                <main className="flex-1 overflow-auto p-8 scrollbar-thin scrollbar-thumb-brand-200 scrollbar-track-transparent">
                    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
