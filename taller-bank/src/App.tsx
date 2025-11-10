// src/App.tsx
import { useState, useEffect } from 'react';
import initialAccounts from './data/initialAccounts.json';
import type { Account, NewAccount } from './types';
import AccountForm from './components/AccountForm';
import ThemeToggle from './components/ThemeToggle';
// 3. Importamos el nuevo componente funcional de React
import TransactionControl from './components/TransactionControl'; 
// ELIMINADA la importación del Web Component y la declaración JSX.IntrinsicElements

let nextId = 1006; 


function BankDashboard() { 
    
    // 4.1. UseState: Estado principal de las cuentas
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 4.2. UseEffect: Carga Inicial
    useEffect(function() {
        setTimeout(function() {
            setAccounts(initialAccounts as Account[]);
            setIsLoading(false);
        }, 1000);
    }, []);

    // ... (Mantener la lógica de createNewAccount) ...
    function createNewAccount(newAccount: NewAccount): void {
        const accountToAdd: Account = { 
            id: nextId++,
            holderName: newAccount.holderName,
            balance: newAccount.initialBalance
        };
        setAccounts(prevAccounts => [...prevAccounts, accountToAdd]);
    }

    // Lógica de Transacciones (inalterada)
    function handleTransaction(id: number, action: 'deposit' | 'withdraw', amount: number): void {
        setAccounts(prevAccounts =>
            prevAccounts.map(account => {
                if (account.id === id) {
                    let newBalance = account.balance;

                    if (action === 'deposit') {
                        newBalance += amount;
                    } else if (action === 'withdraw') {
                        // Validación de Saldo
                        if (account.balance < amount) {
                            alert(`Error: Saldo insuficiente. La cuenta ${id} tiene solo $${account.balance.toFixed(2)}.`);
                            return account; 
                        }
                        newBalance -= amount;
                    }
                    return { ...account, balance: newBalance }; 
                }
                return account;
            })
        );
    }

    if (isLoading) {
        return <div className="p-16 text-center text-xl font-bold text-blue-700 dark:text-blue-300">Cargando sistema bancario...</div>;
    }

    // 5. Tailwind CSS: Diseño Responsivo y Tema
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Sistema Bancario Local</h1>
                    <ThemeToggle />
                </div>

                <AccountForm onCreate={createNewAccount} />

                <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden mt-8 transition-colors duration-300">
                    
                    {/* 🟢 Diseño de Tabla para Desktop (lg: y superior) */}
                    <div className="hidden lg:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Titular</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones / Saldo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {accounts.map((account) => (
                                    <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{account.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{account.holderName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {/* 3. Uso del COMPONENTE FUNCIONAL DE REACT */}
                                            <TransactionControl
                                                currentBalance={account.balance}
                                                // Pasamos la función como prop
                                                onTransaction={(action, amount) => handleTransaction(account.id, action, amount)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* 🟢 Diseño de Tarjetas para Móviles (hidden lg:) */}
                    <div className="lg:hidden p-4 space-y-4">
                        {accounts.map((account) => (
                            <div key={account.id} className="bg-gray-50 dark:bg-gray-700 p-4 shadow-md rounded-lg border-l-4 border-blue-500">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cuenta #{account.id}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Titular: {account.holderName}</p>
                                
                                {/* Uso del COMPONENTE FUNCIONAL DE REACT */}
                                <TransactionControl
                                    currentBalance={account.balance}
                                    onTransaction={(action, amount) => handleTransaction(account.id, action, amount)}
                                />
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default BankDashboard;