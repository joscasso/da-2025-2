import { useState } from 'react';

interface TransactionControlProps {
    currentBalance: number;
    // Función que notifica al padre sobre la acción y el monto
    onTransaction: (action: 'deposit' | 'withdraw', amount: number) => void;
}

function TransactionControl(props: TransactionControlProps) {
    
    // 4.1. UseState: Estado para el monto que el usuario desea ingresar
    const [amount, setAmount] = useState(0); 
    
    // 5. Tailwind CSS: Clases base
    const btnBaseClass = "px-3 py-1 text-white font-bold rounded transition duration-150 text-xs";

    function handleTransactionClick(action: 'deposit' | 'withdraw'): void {
        // Validación 1: Asegurar que el monto sea un número positivo
        if (amount <= 0 || isNaN(amount)) {
            alert('Por favor, ingresa un monto válido y mayor a cero.');
            return;
        }

        // Llamar a la función del componente padre con la acción y el monto dinámico
        props.onTransaction(action, amount);
        
        // Limpiar el campo después de la transacción
        setAmount(0); 
    }

    return (
        <div className="flex flex-col items-start gap-2 p-2 border border-gray-200 dark:border-gray-600 rounded-lg">
            
            {/* Consulta de Saldo */}
            <div className="balance-text text-sm font-medium text-gray-700 dark:text-gray-300">
                Saldo: 
                <span className="font-extrabold text-lg ml-1 
                    text-emerald-500 dark:text-emerald-400">
                    ${props.currentBalance.toFixed(2)}
                </span>
            </div>

            {/* Nuevo Campo de Monto a Ingresar */}
            <input 
                type="number" 
                min="0.01" 
                step="0.01"
                value={amount === 0 ? '' : amount} // truco para que el 0 no aparezca por defecto
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Monto a operar"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            
            <div className="flex gap-2 w-full">
                
                {/* Botón Consignar */}
                <button
                    onClick={() => handleTransactionClick('deposit')}
                    className={`${btnBaseClass} bg-blue-500 hover:bg-blue-600 w-1/2`}
                    disabled={amount <= 0}
                >
                    Consignar
                </button>
                
                {/* Botón Retirar */}
                <button
                    onClick={() => handleTransactionClick('withdraw')}
                    className={`${btnBaseClass} bg-red-500 hover:bg-red-600 w-1/2`}
                    disabled={amount <= 0}
                >
                    Retirar
                </button>
            </div>
        </div>
    );
}

export default TransactionControl;