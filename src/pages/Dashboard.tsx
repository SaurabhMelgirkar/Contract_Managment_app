import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { ContractStatus } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Plus, FileText, ArrowUpRight, Clock, CheckCircle, PenTool } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';
import { useState } from 'react';

export function Dashboard() {
    const navigate = useNavigate();
    const { contracts } = useStore();
    const [filter, setFilter] = useState<'all' | ContractStatus>('all');

    const filteredContracts = contracts.filter(c => {
        const matchesFilter = filter === 'all' || c.status === filter;
        return matchesFilter;
    });

    const stats = {
        total: contracts.length,
        active: contracts.filter(c => ['created', 'approved', 'sent'].includes(c.status)).length,
        signed: contracts.filter(c => c.status === 'signed' || c.status === 'locked').length,
        pending: contracts.filter(c => c.status === 'sent').length,
    };

    return (
        <div className="space-y-10">
            <div className="flex items-end justify-between">
                <div className="space-y-1">
                    <h2 className="text-4xl font-bold text-surface-900 tracking-tight font-heading">
                        Overview
                    </h2>
                    <p className="text-lg text-surface-500">
                        Track your contract lifecycle metrics.
                    </p>
                </div>
                <Button onClick={() => navigate('/create-contract')} size="lg" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Contract
                </Button>
            </div>

            {/* Stats Cards - Unique Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="Total Volume"
                    value={stats.total}
                    icon={FileText}
                    trend="+12% from last month"
                    color="from-brand-500 to-brand-600"
                />
                <StatsCard
                    label="Active Drats"
                    value={stats.active}
                    icon={Clock}
                    trend="3 requiring action"
                    color="from-accent-500 to-accent-600"
                />
                <StatsCard
                    label="Pending Signatures"
                    value={stats.pending}
                    icon={PenTool}
                    trend="Avg. 2 days wait"
                    color="from-amber-400 to-orange-500"
                />
                <StatsCard
                    label="Completed"
                    value={stats.signed}
                    icon={CheckCircle}
                    trend="100% compliance"
                    color="from-emerald-400 to-emerald-600"
                />
            </div>

            {/* Recent Contracts - Modern List */}
            <Card className="border-none shadow-glass bg-white/60">
                <div className="p-8 border-b border-surface-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-surface-900 font-heading">Recent Activity</h3>
                    <div className="flex items-center gap-4">
                        {/* Simple Tabs */}
                        <div className="flex p-1 bg-surface-100 rounded-xl">
                            {['all', 'created', 'sent', 'signed'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all",
                                        filter === f ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-50/50 text-surface-400 uppercase tracking-widest text-[10px] font-bold">
                            <tr>
                                <th className="px-8 py-6 rounded-tl-3xl">Contract Details</th>
                                <th className="px-6 py-6">Stage</th>
                                <th className="px-6 py-6">Timeline</th>
                                <th className="px-8 py-6 text-right rounded-tr-3xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-100">
                            {filteredContracts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center text-surface-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FileText className="w-8 h-8 text-surface-300 mb-2" />
                                            <p>No contracts found matching your filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredContracts.map((contract) => (
                                    <tr
                                        key={contract.id}
                                        className="group hover:bg-white/80 transition-all cursor-pointer"
                                        onClick={() => navigate(`/contracts/${contract.id}`)}
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                                                    {contract.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-surface-900 group-hover:text-brand-600 transition-colors">{contract.name}</p>
                                                    <p className="text-xs text-surface-500">{contract.blueprintName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <Badge status={contract.status} />
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm font-medium text-surface-700">
                                                {format(new Date(contract.createdAt), 'MMM d, yyyy')}
                                            </div>
                                            <div className="text-xs text-surface-400">Created</div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/contracts/${contract.id}`); }}
                                                className="w-10 h-10 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50 transition-all"
                                            >
                                                <ArrowUpRight className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

function StatsCard({ label, value, icon: Icon, trend, color }: any) {
    return (
        <div className="relative overflow-hidden bg-white border border-white/20 rounded-3xl p-6 shadow-xl shadow-brand-900/5 group hover:-translate-y-1 transition-transform duration-300">
            <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-20", color)} />

            <div className="relative z-10 flex flex-col gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br text-white shadow-lg", color)}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-3xl font-bold text-surface-900 font-heading">{value}</p>
                    <p className="text-sm font-medium text-surface-500 mt-1">{label}</p>
                </div>
                <div className="pt-4 border-t border-surface-50">
                    <p className="text-xs font-semibold text-brand-600">{trend}</p>
                </div>
            </div>
        </div>
    );
}
