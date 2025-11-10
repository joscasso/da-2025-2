import React, { useState } from 'react';
import type { NewAccount } from '../types';

interface AccountFormProps {
    onCreate: (newAccount: NewAccount) => void;
}

function AccountForm(props: AccountFormProps) {
    
    // 4.1. UseState
    const [holderName, setHolderName] = useState('');
    const [initialBalance, setInitialBalance] = useState(0);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault();
        
        // Validación básica
        if (!holderName || initialBalance < 0) {
            alert('El nombre es requerido y el saldo inicial no puede ser negativo.');
            return;
        }

        const newAccount: NewAccount = { holderName, initialBalance };
        props.onCreate(newAccount);

        // Limpiar formulario
        setHolderName('');
        setInitialBalance(0);
    }

    // 5. Tailwind CSS: Diseño Responsivo
    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-lg mb-8 border-t-4 border-blue-500 transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Crear Nueva Cuenta</h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titular de la Cuenta</label>
                    <input type="text" value={holderName} onChange={(e) => setHolderName(e.target.value)} required 
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Saldo Inicial ($)</label>
                    <input type="number" min="0" step="0.01" value={initialBalance} onChange={(e) => setInitialBalance(Number(e.target.value))} required 
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm p-2" />
                </div>
                
                <div className="flex items-end">
                    <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition">
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AccountForm;