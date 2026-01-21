import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Blueprint, Contract, ContractStatus } from '../types';

interface AppState {
    blueprints: Blueprint[];
    contracts: Contract[];

    addBlueprint: (blueprint: Blueprint) => void;
    updateBlueprint: (id: string, updates: Partial<Blueprint>) => void;
    deleteBlueprint: (id: string) => void;

    addContract: (contract: Contract) => void;
    updateContract: (id: string, updates: Partial<Contract>) => void;
    updateContractStatus: (id: string, status: ContractStatus) => void;
}

// Dummy Data
const INITIAL_BLUEPRINTS: Blueprint[] = [
    {
        id: 'bp-1',
        name: 'NDA Standard Agreement',
        description: 'Standard Non-Disclosure Agreement for new employees or contractors.',
        fields: [
            { id: 'f-1', type: 'text', label: 'Disclosing Party', required: true, placeholder: 'Company Name' },
            { id: 'f-2', type: 'text', label: 'Receiving Party', required: true, placeholder: 'Recipient Name' },
            { id: 'f-3', type: 'date', label: 'Effective Date', required: true },
            { id: 'f-4', type: 'checkbox', label: 'Include IP Clauses', required: false },
            { id: 'f-5', type: 'signature', label: 'Recipient Signature', required: true },
        ],
        createdAt: new Date(Date.now() - 10000000).toISOString(),
        updatedAt: new Date(Date.now() - 5000000).toISOString(),
    },
    {
        id: 'bp-2',
        name: 'Freelance Service Contract',
        description: 'General purpose contract for freelance web development services.',
        fields: [
            { id: 'f-10', type: 'text', label: 'Client Name', required: true },
            { id: 'f-11', type: 'text', label: 'Project Scope', required: true, placeholder: 'e.g. Website Redesign' },
            { id: 'f-12', type: 'text', label: 'Rate (USD / Hour)', required: true },
            { id: 'f-13', type: 'date', label: 'Start Date', required: true },
            { id: 'f-14', type: 'signature', label: 'Contractor Signature', required: true },
        ],
        createdAt: new Date(Date.now() - 8000000).toISOString(),
        updatedAt: new Date(Date.now() - 4000000).toISOString(),
    }
];

const generateDummyContracts = (count: number): Contract[] => {
    const statuses: ContractStatus[] = ['created', 'approved', 'sent', 'signed', 'locked'];
    const companies = ['Acme Corp', 'Stark Ind', 'Wayne Ent', 'Cyberdyne', 'Umbrella', 'Globex', 'Soylent', 'Massive Dynamic', 'Hooli', 'Initech'];

    return Array.from({ length: count }).map((_, i) => {
        const status = statuses[i % statuses.length];
        const isNDA = i % 2 === 0;
        const bp = isNDA ? INITIAL_BLUEPRINTS[0] : INITIAL_BLUEPRINTS[1];
        const company = companies[i % companies.length];

        return {
            id: `c-${i + 1}`,
            blueprintId: bp.id,
            blueprintName: bp.name,
            name: `${isNDA ? 'NDA' : 'Service Contract'} - ${company} ${i + 1}`,
            status,
            fieldValues: {},
            history: [
                { status: 'created', timestamp: new Date(Date.now() - (i * 10000000)).toISOString() }
            ],
            createdAt: new Date(Date.now() - (i * 10000000)).toISOString(),
            updatedAt: new Date(Date.now() - (i * 5000000)).toISOString(),
        };
    });
};

const INITIAL_CONTRACTS = generateDummyContracts(35);

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            blueprints: INITIAL_BLUEPRINTS,
            contracts: INITIAL_CONTRACTS,

            addBlueprint: (bp) => set((state) => ({ blueprints: [...state.blueprints, bp] })),
            updateBlueprint: (id, updates) => set((state) => ({
                blueprints: state.blueprints.map((b) => b.id === id ? { ...b, ...updates } : b)
            })),
            deleteBlueprint: (id) => set((state) => ({
                blueprints: state.blueprints.filter((b) => b.id !== id)
            })),

            addContract: (c) => set((state) => ({ contracts: [...state.contracts, c] })),
            updateContract: (id, updates) => set((state) => ({
                contracts: state.contracts.map((c) => c.id === id ? { ...c, ...updates } : c)
            })),
            updateContractStatus: (id, status) => set((state) => ({
                contracts: state.contracts.map((c) => {
                    if (c.id === id) {
                        return {
                            ...c,
                            status,
                            history: [...c.history, { status, timestamp: new Date().toISOString() }],
                            updatedAt: new Date().toISOString()
                        };
                    }
                    return c;
                })
            }))
        }),
        {
            name: 'contract-app-storage',
        }
    )
);
