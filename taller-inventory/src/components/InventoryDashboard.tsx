import { useState, useEffect } from 'react';
import initialInventory from '../data/initialInventory.json'; // Carga del JSON
import type { Product, NewProduct } from '../types';
import ProductForm from './ProductForm';
import StockControl from './StockControl'; // Componente de React ajustado

let nextId = 21; // Inicialización del ID

function InventoryDashboard() { 
    
    // 4.1. UseState: Estado del inventario (tipado con Product[])
    const [inventory, setInventory] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 4.2. UseEffect: Carga Inicial de Datos (Simula la carga de una fuente externa)
    useEffect(function() {
        setTimeout(function() {
            setInventory(initialInventory as Product[]);
            setIsLoading(false);
        }, 1000);
    }, []); // Array de dependencias vacío: se ejecuta solo al montar

    // 4.2. UseEffect: Efecto Secundario (Actualiza el título del navegador al cambiar el inventario)
    useEffect(function() {
        document.title = `Inventario (${inventory.length} Productos)`;
    }, [inventory]); // Se ejecuta cada vez que 'inventory' cambia

    // --- LÓGICA DE NEGOCIO ---

    function createNewProduct(newProduct: NewProduct): void {
        const productToAdd: Product = { ...newProduct, id: nextId++, };
        setInventory(prevInventory => [...prevInventory, productToAdd]);
    }

    function handleStockAdjustment(id: number, action: 'increment' | 'decrement'): void {
        setInventory(prevInventory =>
            prevInventory.map(product => {
                if (product.id === id) {
                    const newStock = action === 'increment' ? product.stock + 1 : Math.max(0, product.stock - 1);
                    return { ...product, stock: newStock }; // Retorno inmutable
                }
                return product;
            })
        );
    }

    if (isLoading) {
        return <div className="p-16 text-center text-xl font-bold text-blue-700">Cargando inventario...</div>;
    }

    // 5. Tailwind CSS: Diseño Responsivo y Renderizado
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Panel de Stock Local</h1>

                <ProductForm onCreate={createNewProduct} />

                <div className="bg-white shadow-2xl rounded-lg overflow-hidden mt-8">
                    
                    {/* 🟢 DISEÑO RESPONSIVO: Vista de Tabla (Visible en pantallas medianas y grandes) */}
                    <div className="hidden sm:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Control de Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {inventory.map((product) => (
                                    <tr key={product.id} className={product.stock === 0 ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {/* Consumo del componente StockControl */}
                                            <StockControl
                                                stock={product.stock}
                                                onAdjust={(action) => handleStockAdjustment(product.id, action)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* 🟢 DISEÑO RESPONSIVO: Vista de Tarjetas (Visible solo en móviles) */}
                    <div className="sm:hidden p-4 space-y-4">
                        {inventory.map((product) => (
                            <div key={product.id} className={`bg-white p-4 shadow-md rounded-lg ${product.stock === 0 ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="text-sm font-medium">Stock:</span>
                                    <StockControl
                                        stock={product.stock}
                                        onAdjust={(action) => handleStockAdjustment(product.id, action)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default InventoryDashboard;
