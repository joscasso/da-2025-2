import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // useParams para obtener el ID de la URL
import type { AppDispatch, RootState } from '../store/store';
import { updateProduct } from '../store/productsSlice';
import type { Product } from '../types';
import '../App.css'

// Definimos el tipo para los datos del formulario (usamos un subconjunto de User)
type FormData = {
    id: string | undefined;
    name: string;
    description: string;
    stock: number;
    price: number;
};

const EditProduct = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL (string)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.users.products);

  // 1. Encontrar el producto por ID
  const productId = id;
  const productToEdit = products.find((u) => u.id === productId);

  const [formData, setFormData] = useState<FormData>({
    id: productId,
    name: '',
    description: '',
    stock: 0,
    price: 0,
  });

  // 2. Cargar los datos delproducto en el estado local del formulario
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        id: productToEdit.id,
        name: productToEdit.name,
        description: productToEdit.description,
        stock: productToEdit.stock,
        price: productToEdit.price,
      });
    } else if (!productId) {
        // Podríamos redirigir si el ID no es válido o no se encuentra
        navigate('/'); 
    }
  }, [productToEdit, productId, navigate]);

  if (!productToEdit) {
    return <p className="text-center text-red-500 text-xl">Producto no encontrado (ID: {id})</p>;
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Crear el objeto producto COMPLETO para la actualización
    const updatedProduct: Product = {
        ...productToEdit, // Mantiene todos los campos originales (id y created_at)
        name: formData.name,
        description: formData.description,
        stock: formData.stock,
        price: formData.price,
    };


    // 4. Despachar la acción de actualización
    dispatch(updateProduct(updatedProduct))
      .unwrap()
      .then(() => {
        navigate('/'); // Navegar de vuelta a la lista
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un error al actualizar el producto.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Editar Producto ({productToEdit.name})</h2>

      {/* Campos del formulario, pre-llenados con el estado inicial del producto */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
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
          className="text-right w-full p-2 border border-gray-300 rounded"
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
          className="text-right w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-150"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditProduct;
