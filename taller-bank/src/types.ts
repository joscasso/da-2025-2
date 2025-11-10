export interface Account {
    id: number;
    holderName: string;
    balance: number;
}

export interface NewAccount {
    holderName: string;
    initialBalance: number;
}