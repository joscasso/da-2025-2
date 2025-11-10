import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // useParams para obtener el ID de la URL
import type { AppDispatch, RootState } from '../store/store';
import { updateUser } from '../store/usersSlice';
import type { User } from '../types';

// Definimos el tipo para los datos del formulario (usamos un subconjunto de User)
type FormData = {
    id: number;
    name: string;
    username: string;
    email: string;
};

const EditUser = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL (string)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  // 1. Encontrar el usuario por ID
  const userId = parseInt(id || '0', 10);
  const userToEdit = users.find((u) => u.id === userId);

  const [formData, setFormData] = useState<FormData>({
    id: userId,
    name: '',
    username: '',
    email: '',
  });

  // 2. Cargar los datos del usuario en el estado local del formulario
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        id: userToEdit.id,
        name: userToEdit.name,
        username: userToEdit.username,
        email: userToEdit.email,
      });
    } else if (userId !== 0) {
        // Podríamos redirigir si el ID no es válido o no se encuentra
        // navigate('/'); 
    }
  }, [userToEdit, userId]);

  if (!userToEdit) {
    return <p className="text-center text-red-500 text-xl">Usuario no encontrado (ID: {id})</p>;
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Crear el objeto User COMPLETO para la actualización
    const updatedUser: User = {
        ...userToEdit, // Mantiene todos los campos originales (address, company, etc.)
        id: formData.id,
        name: formData.name,
        username: formData.username,
        email: formData.email,
    };


    // 4. Despachar la acción de actualización
    dispatch(updateUser(updatedUser))
      .unwrap()
      .then(() => {
        alert('Usuario actualizado (simulado) exitosamente!');
        navigate('/'); // Navegar de vuelta a la lista
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
        alert('Hubo un error al actualizar el usuario.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Editar Usuario (ID: {userToEdit.id})</h2>

      {/* Campos del formulario, pre-llenados con el estado inicial del usuario */}
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
        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
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

export default EditUser;
