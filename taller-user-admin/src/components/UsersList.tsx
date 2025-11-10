import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchUsers, deleteUser } from '../store/usersSlice';
import { Link } from 'react-router-dom';

const UsersList = () => {
  // 1. Hook para despachar acciones
  const dispatch = useDispatch<AppDispatch>();
  // 2. Hook para seleccionar datos del estado de Redux
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  // 3. Cargar usuarios al montar el componente (Side Effect)
  useEffect(() => {
   if (users.length === 0 && !loading) {
      dispatch(fetchUsers());
    }
}, [dispatch, users.length, loading]);

  // 4. Manejador de Eliminación
  const handleDelete = (userId: number) => {
    if (window.confirm(`¿Estás seguro de eliminar el usuario con ID: ${userId}?`)) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading) return <p className="text-center text-xl">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center gap-2">
                {/* Enlace para editar */}
                <Link
                  to={`/edit/${user.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Editar
                </Link>
                {/* Botón para eliminar */}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
