import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../store/store';
import { createProduct } from '../store/productsSlice';
import type { Product } from '../types';
import '../App.css'

// Definimos el tipo para los datos del formulario (usamos un subconjunto de Product)
type FormData = Omit<Product, 'id' | 'created_at'>;

const AddProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook para la navegación programática
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    stock: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Crear un objeto Producto parcial para enviar a la acción de Redux
    const newProductPartial: FormData = {
        ...formData,
    };

    // 2. Despachar la acción de creación
    dispatch(createProduct(newProductPartial))
      .unwrap() // Desenvuelve el Promise para manejar el éxito/error
      .then(() => {
        navigate('/'); // 3. Navegar de vuelta a la lista tras el éxito
      })
      .catch((error) => {
        console.error('Error al crear producto:', error);
        alert('Hubo un error al crear el producto.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Añadir Nuevo Producto</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Descripción</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="text-right w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="text-right w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>      

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-150"
      >
        Crear Producto
      </button>
    </form>
  );
};

export default AddProduct;
