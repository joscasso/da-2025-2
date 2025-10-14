interface StockControlProps {
    stock: number;
    // Función que notifica al padre sobre la acción (TypeScript)
    onAdjust: (action: 'increment' | 'decrement') => void;
}

function StockControl(props: StockControlProps) {

    // 5. Tailwind CSS: Estilizado
    const buttonClass = "px-3 py-1 text-white font-bold rounded transition duration-150";
    const incrementClass = "bg-blue-500 hover:bg-blue-600";
    // Clases condicionales para el botón de decremento
    const decrementClass = props.stock > 0 
        ? "bg-red-500 hover:bg-red-600" 
        : "bg-gray-400 cursor-not-allowed";

    return (
        <div className="flex items-center space-x-2">
            
            <button
                // 4.1. Manejo del evento directo
                onClick={() => props.onAdjust('decrement')}
                className={`${buttonClass} ${decrementClass}`}
                disabled={props.stock <= 0}
            >
                -
            </button>
            
            <span className="stock-display w-10 text-center font-extrabold text-lg text-gray-800">
                {props.stock}
            </span>
            
            <button
                onClick={() => props.onAdjust('increment')}
                className={`${buttonClass} ${incrementClass}`}
            >
                +
            </button>
        </div>
    );
}

export default StockControl;
