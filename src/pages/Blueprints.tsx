
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Plus, FileText, ArrowRight, Trash2, Clock, Layers } from 'lucide-react';
import { format } from 'date-fns';

export function Blueprints() {
    const navigate = useNavigate();
    const { blueprints, deleteBlueprint } = useStore();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Contract Blueprints</h2>
                    <p className="text-slate-500">Manage and create reusable contract templates.</p>
                </div>
                <Button onClick={() => navigate('/blueprints/new')} className="gap-2 shadow-lg shadow-brand-500/20">
                    <Plus className="w-4 h-4" />
                    Create Blueprint
                </Button>
            </div>

            {blueprints.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">No blueprints found</h3>
                    <p className="text-slate-500 mb-6 max-w-sm text-center">Start by creating your first contract blueprint. You'll use this to generate actual contracts.</p>
                    <Button onClick={() => navigate('/blueprints/new')} variant="outline">
                        Create First Blueprint
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blueprints.map((bp) => (
                        <div
                            key={bp.id}
                            className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col overflow-hidden"
                        >
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteBlueprint(bp.id); }}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate" title={bp.name}>
                                    {bp.name}
                                </h3>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Layers className="w-4 h-4 mr-2" />
                                        {bp.fields.length} Fields defined
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Updated {format(new Date(bp.updatedAt), 'MMM d, yyyy')}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 border-t border-slate-100 flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 text-xs"
                                    onClick={() => navigate(`/blueprints/${bp.id}`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="flex-1 text-xs gap-1"
                                    onClick={() => navigate(`/create-contract?blueprint=${bp.id}`)}
                                >
                                    Use Template <ArrowRight className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
