export type FieldType = 'text' | 'date' | 'checkbox' | 'signature';

export interface Field {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
    placeholder?: string;
}

export interface Blueprint {
    id: string;
    name: string;
    description: string;
    fields: Field[];
    createdAt: string;
    updatedAt: string;
}

export type ContractStatus = 'draft' | 'created' | 'approved' | 'sent' | 'signed' | 'locked' | 'revoked';

export interface Contract {
    id: string;
    blueprintId: string;
    blueprintName: string; // Denormalized for easier display
    name: string;
    status: ContractStatus;
    fieldValues: Record<string, any>; // fieldId -> value
    history: ContractHistoryEvent[];
    createdAt: string;
    updatedAt: string;
}

export interface ContractHistoryEvent {
    status: ContractStatus;
    timestamp: string;
    note?: string;
}
