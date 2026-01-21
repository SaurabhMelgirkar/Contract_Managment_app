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

// 15 Dummy Blueprints
const generateBlueprints = (): Blueprint[] => {
    const titles = [
        "NDA Standard Agreement", "Freelance Service Contract", "Employment Offer Letter", "Software License Agreement", "Consulting Agreement",
        "Lease Agreement (Commercial)", "Partnership Deed", "Vendor Supplier Contract", "Website Maintenance", "IP Assignment Deed",
        "SaaS Subscription Agreement", "Marketing Retainer", "Event Sponsorship", "Data Processing Addendum", "Termination Notice"
    ];

    return titles.map((title, i) => ({
        id: `bp-${i + 1}`,
        name: title,
        description: `Standard template for ${title}.`,
        fields: [
            { id: `f-${i}-1`, type: 'text', label: 'Primary Party', required: true },
            { id: `f-${i}-2`, type: 'text', label: 'Counterparty', required: true },
            { id: `f-${i}-3`, type: 'date', label: 'Effective Date', required: true },
            { id: `f-${i}-4`, type: 'signature', label: 'Signature', required: true }
        ],
        createdAt: new Date(Date.now() - (i * 86400000)).toISOString(),
        updatedAt: new Date(Date.now() - (i * 43200000)).toISOString(),
    }));
};

const INITIAL_BLUEPRINTS = generateBlueprints();

// 15 Dummy Contracts (linked to blueprints)
const generateContracts = (blueprints: Blueprint[]): Contract[] => {
    const companies = ['Acme Corp', 'Stark Ind', 'Wayne Ent', 'Cyberdyne', 'Umbrella', 'Globex', 'Soylent', 'Massive Dynamic', 'Hooli', 'Initech', 'Tyrell Corp', 'Oscorp', 'LexCorp', 'Aperture Science', 'Black Mesa'];
    const statuses: ContractStatus[] = ['created', 'approved', 'sent', 'signed', 'locked'];

    return Array.from({ length: 15 }).map((_, i) => {
        const bp = blueprints[i];
        const status = statuses[i % 5];
        return {
            id: `c-${i + 1}`,
            blueprintId: bp.id,
            blueprintName: bp.name,
            name: `${bp.name} - ${companies[i]}`,
            status,
            fieldValues: {
                [`f-${i}-1`]: 'My Company Inc',
                [`f-${i}-2`]: companies[i],
                [`f-${i}-3`]: new Date().toISOString().split('T')[0],
            },
            history: [
                { status: 'created', timestamp: new Date(Date.now() - 10000000).toISOString() }
            ],
            createdAt: new Date(Date.now() - (i * 3600000)).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
        };
    });
};

const INITIAL_CONTRACTS = generateContracts(INITIAL_BLUEPRINTS);

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
