import React, { useState } from 'react';
import type { NewProduct } from '../types';

interface ProductFormProps {
    onCreate: (product: NewProduct) => void;
}

function ProductForm(props: ProductFormProps) {
    
    // 4.1. UseState: Estados locales del formulario
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    function handleSubmit(e: React.FormEvent): void {
        e.preventDefault(); // Previene el comportamiento defecto que es el envio del formulario
        
        if (!name || props.onCreate === undefined || price <= 0 || stock < 0) {
            alert('Asegúrate de rellenar los campos correctamente.');
            return;
        }

        const newProduct: NewProduct = { name, price, stock };
        props.onCreate(newProduct);

        // Limpiar formulario
        setName('');
        setPrice(0);
        setStock(0);
    }

    // 5. Tailwind CSS: Diseño Responsivo
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-xl rounded-lg mb-8 border-t-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Crear Nuevo Producto</h2>
            
            {/* Responsividad: Se ajusta a 1 columna en móvil y 4 en desktop */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                        className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio ($)</label>
                    <input type="number" min="0.01" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required 
                        className="text-black text-right mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Inicial</label>
                    <input type="number" min="0" value={stock} onChange={(e) => setStock(Number(e.target.value))} required 
                        className="text-black text-right mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                
                <div className="flex items-end">
                    <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition">
                        Añadir Producto
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProductForm;
