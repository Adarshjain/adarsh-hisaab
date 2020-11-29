export interface Client {
    id: string
    name: string
    balance: number
}

export interface Company {
    id: string
    name: string
}

export interface Transaction {
    id: string
    amount: number
    type: "credit" | "debit"
    companyId: string
    date: number
    narration?: string
    clientId: string
}

export interface FlatTransaction {
    id: string
    debit: string
    credit: string
    internalDate: number
    companyId: string
    date: string
    narration: string
    clientId: string
    type: "credit" | "debit"
    amount: number
}

export interface TransactionInput {
    id?: string
    amount: number
    type: "credit" | "debit"
    companyId: string
    date: number
    narration?: string
    clientId: string
}

export interface ClientInput {
    id?: string
    name: string
    balance: number
}