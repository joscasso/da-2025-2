import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../store/store';
import { createUser } from '../store/usersSlice';
import type { User } from '../types';

// Definimos el tipo para los datos del formulario (usamos un subconjunto de User)
type FormData = Omit<User, 'id' | 'address' | 'company' | 'phone' | 'website'>;

const AddUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook para la navegación programática
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Crear un objeto User parcial para enviar a la acción de Redux
    const newUserPartial: Omit<User, 'id'> = {
        ...formData,
        phone: 'N/A',
        website: 'N/A',
    };

    // 2. Despachar la acción de creación
    dispatch(createUser(newUserPartial))
      .unwrap() // Desenvuelve el Promise para manejar el éxito/error
      .then(() => {
        alert('Usuario creado (simulado) exitosamente!');
        navigate('/'); // 3. Navegar de vuelta a la lista tras el éxito
      })
      .catch((error) => {
        console.error('Error al crear usuario:', error);
        alert('Hubo un error al crear el usuario.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Añadir Nuevo Usuario</h2>

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
        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-150"
      >
        Crear Usuario
      </button>
    </form>
  );
};

export default AddUser;
