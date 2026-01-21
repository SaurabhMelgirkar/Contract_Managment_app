import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { Contract } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { FileText, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

export function CreateContract() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { blueprints, addContract } = useStore();

    const [step, setStep] = useState(1);
    const [selectedBlueprintId, setSelectedBlueprintId] = useState<string | null>(searchParams.get('blueprint'));
    const [contractName, setContractName] = useState('');
    const [fieldValues, setFieldValues] = useState<Record<string, any>>({});

    const selectedBlueprint = blueprints.find(b => b.id === selectedBlueprintId);

    useEffect(() => {
        if (searchParams.get('blueprint')) {
            setSelectedBlueprintId(searchParams.get('blueprint'));
            setStep(2);
        }
    }, [searchParams]);

    const handleCreate = () => {
        if (!selectedBlueprint || !contractName) return;

        const newContract: Contract = {
            id: crypto.randomUUID(),
            blueprintId: selectedBlueprint.id,
            blueprintName: selectedBlueprint.name,
            name: contractName,
            status: 'created',
            fieldValues,
            history: [{ status: 'created', timestamp: new Date().toISOString() }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        addContract(newContract);
        navigate(`/contracts/${newContract.id}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">New Contract</h2>
                <p className="text-slate-500">Draft a new contract from an existing blueprint.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-4 text-sm font-medium">
                <div className={cn("flex items-center gap-2", step >= 1 ? "text-brand-600" : "text-slate-400")}>
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", step >= 1 ? "bg-brand-100" : "bg-slate-100")}>1</div>
                    Select Blueprint
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <div className={cn("flex items-center gap-2", step >= 2 ? "text-brand-600" : "text-slate-400")}>
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", step >= 2 ? "bg-brand-100" : "bg-slate-100")}>2</div>
                    Fill Details
                </div>
            </div>

            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blueprints.map((bp) => (
                        <button
                            key={bp.id}
                            onClick={() => { setSelectedBlueprintId(bp.id); setStep(2); }}
                            className="text-left group bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-500 hover:ring-1 hover:ring-brand-500 transition-all shadow-sm hover:shadow-lg"
                        >
                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 mb-4 transition-colors">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{bp.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{bp.fields.length} fields configured</p>
                        </button>
                    ))}
                    {blueprints.length === 0 && (
                        <div className="col-span-full p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No blueprints available. Create one first.</p>
                            <Button className="mt-4" onClick={() => navigate('/blueprints/new')}>Create Blueprint</Button>
                        </div>
                    )}
                </div>
            )}

            {step === 2 && selectedBlueprint && (
                <Card className="max-w-2xl bg-white shadow-xl border-slate-200">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-slate-900">Contract Details</h3>
                            <p className="text-sm text-slate-500">Based on <span className="font-medium text-slate-700">{selectedBlueprint.name}</span></p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Change Blueprint</Button>
                    </div>

                    <div className="p-8 space-y-6">
                        <Input
                            label="Contract Title"
                            placeholder="e.g. Service Agreement - Acme Corp"
                            value={contractName}
                            onChange={(e) => setContractName(e.target.value)}
                            className="text-lg font-medium"
                        />

                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Required Information</h4>
                            {selectedBlueprint.fields.map((field) => (
                                <div key={field.id}>
                                    {field.type === 'text' && (
                                        <Input
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            value={fieldValues[field.id] || ''}
                                            onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
                                        />
                                    )}
                                    {field.type === 'date' && (
                                        <Input
                                            type="date"
                                            label={field.label}
                                            required={field.required}
                                            value={fieldValues[field.id] || ''}
                                            onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
                                        />
                                    )}
                                    {field.type === 'checkbox' && (
                                        <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                id={field.id}
                                                checked={!!fieldValues[field.id]}
                                                onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.checked })}
                                                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                                            />
                                            <label htmlFor={field.id} className="text-sm font-medium text-slate-700 select-none cursor-pointer">
                                                {field.label}
                                            </label>
                                        </div>
                                    )}
                                    {field.type === 'signature' && (
                                        <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 text-center">
                                            <p className="text-sm text-slate-500 mb-2">{field.label}</p>
                                            <div className="text-xs text-slate-400 italic">Signature will be collected during signing phase</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => navigate('/')}>Cancel</Button>
                            <Button onClick={handleCreate} disabled={!contractName}>
                                Generate Contract
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
