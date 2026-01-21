import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { Blueprint, Field, FieldType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Trash2, Save, ArrowLeft, Type, Calendar, CheckSquare, PenTool, Settings2 } from 'lucide-react';
import { cn } from '../utils/cn';

const FIELD_TYPES: { type: FieldType; label: string; icon: React.ElementType }[] = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'date', label: 'Date Picker', icon: Calendar },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'signature', label: 'Signature', icon: PenTool },
];

export function BlueprintEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blueprints, addBlueprint, updateBlueprint } = useStore();

    const [name, setName] = useState('Untitled Blueprint');
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const bp = blueprints.find(b => b.id === id);
            if (bp) {
                setName(bp.name);
                setFields(bp.fields);
            }
        }
    }, [id, blueprints]);

    const handleAddField = (type: FieldType) => {
        const newField: Field = {
            id: crypto.randomUUID(),
            type,
            label: `New ${type} Field`,
            required: false,
            placeholder: type === 'text' ? 'Enter text...' : undefined
        };
        setFields([...fields, newField]);
        setSelectedFieldId(newField.id);
    };

    const handleUpdateField = (id: string, updates: Partial<Field>) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleDeleteField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
        if (selectedFieldId === id) setSelectedFieldId(null);
    };

    const handleSave = () => {
        if (!name.trim()) return;

        const blueprint: Blueprint = {
            id: id || crypto.randomUUID(),
            name,
            description: '',
            fields,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        if (id) {
            updateBlueprint(id, blueprint); // Fix: passed full object, store expects object or partial? Store expects partial for update.
            // My store updateBlueprint signature: (id: string, updates: Partial<Blueprint>)
            // So this is correct.
        } else {
            addBlueprint(blueprint);
        }
        navigate('/blueprints');
    };

    const selectedField = fields.find(f => f.id === selectedFieldId);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/blueprints')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-slate-400 w-96 text-slate-800"
                            placeholder="Blueprint Name"
                        />
                        <p className="text-sm text-slate-500">Define the structure of your contract.</p>
                    </div>
                </div>
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Blueprint
                </Button>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* Left Sidebar: Controls */}
                <Card className="w-80 flex flex-col overflow-hidden bg-white shadow-xl border-slate-200">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Settings2 className="w-4 h-4" />
                            Editor Controls
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Add Fields Section */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Add Elements</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {FIELD_TYPES.map((item) => (
                                    <button
                                        key={item.type}
                                        onClick={() => handleAddField(item.type)}
                                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-white hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition-all group text-sm font-medium text-slate-600"
                                    >
                                        <item.icon className="w-6 h-6 mb-2 text-slate-400 group-hover:text-brand-500" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Field Properties Section */}
                        {selectedField ? (
                            <div className="animate-fade-in space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Properties</h4>
                                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                                        {selectedField.type}
                                    </span>
                                </div>

                                <Input
                                    label="Field Label"
                                    value={selectedField.label}
                                    onChange={(e) => handleUpdateField(selectedField.id, { label: e.target.value })}
                                />

                                {selectedField.type === 'text' && (
                                    <Input
                                        label="Placeholder"
                                        value={selectedField.placeholder || ''}
                                        onChange={(e) => handleUpdateField(selectedField.id, { placeholder: e.target.value })}
                                    />
                                )}

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="required"
                                        checked={selectedField.required}
                                        onChange={(e) => handleUpdateField(selectedField.id, { required: e.target.checked })}
                                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                                    />
                                    <label htmlFor="required" className="text-sm text-slate-700">Required Field</label>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="w-full justify-start gap-2"
                                        onClick={() => handleDeleteField(selectedField.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete Field
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-8 text-center text-slate-400">
                                <p className="text-sm">Select a field to edit its properties.</p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Main Canvas: Preview */}
                <div className="flex-1 bg-slate-200/50 rounded-xl border border-slate-200/60 overflow-y-auto p-8 flex justify-center">
                    <div className="w-full max-w-3xl bg-white min-h-[800px] shadow-2xl rounded-sm p-12 space-y-8 relative">
                        {/* Paper Header */}
                        <div className="border-b-2 border-slate-900 pb-4 mb-8">
                            <h1 className="text-3xl font-serif font-bold text-slate-900">{name}</h1>
                            <p className="text-slate-500 mt-2">Contract Agreement</p>
                        </div>

                        {/* Fields List */}
                        <div className="space-y-6">
                            {fields.length === 0 && (
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center">
                                    <p className="text-slate-400">Your canvas is empty.</p>
                                    <p className="text-slate-500 font-medium">Add fields from the left sidebar.</p>
                                </div>
                            )}

                            {fields.map((field) => (
                                <div
                                    key={field.id}
                                    onClick={() => setSelectedFieldId(field.id)}
                                    className={cn(
                                        "relative group p-4 border rounded-lg transition-all cursor-pointer",
                                        selectedFieldId === field.id
                                            ? "border-brand-500 ring-1 ring-brand-500 bg-brand-50/10"
                                            : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                                    )}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>

                                    <div className="pointer-events-none">
                                        {field.type === 'text' && (
                                            <div className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
                                                {field.placeholder || 'Text input'}
                                            </div>
                                        )}
                                        {field.type === 'date' && (
                                            <div className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 flex items-center justify-between">
                                                <span>Select date...</span>
                                                <Calendar className="w-4 h-4 opacity-50" />
                                            </div>
                                        )}
                                        {field.type === 'checkbox' && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded border border-slate-300 bg-slate-50" />
                                                <span className="text-sm text-slate-500">Checkbox Option</span>
                                            </div>
                                        )}
                                        {field.type === 'signature' && (
                                            <div className="h-24 w-full rounded-md border-2 border-dashed border-slate-300 bg-slate-50 flex items-end justify-center pb-2">
                                                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold border-t border-slate-300 px-8 pt-1">Signature</span>
                                            </div>
                                        )}
                                    </div>

                                    {selectedFieldId === field.id && (
                                        <div className="absolute top-2 right-2 opacity-100 transition-opacity">
                                            <Settings2 className="w-4 h-4 text-brand-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Paper Footer */}
                        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between text-xs text-slate-400 font-mono">
                            <span>Page 1 of 1</span>
                            <span>Generated by ContractFlow</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
