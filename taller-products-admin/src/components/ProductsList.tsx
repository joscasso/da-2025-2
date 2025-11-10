import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchProducts, deleteProduct } from '../store/productsSlice';
import { Link } from 'react-router-dom';
import { formatQuantity, formatCurrency } from '../utils/utils'
import '../App.css'

const ProductsList = () => {
  // 1. Hook para despachar acciones
  const dispatch = useDispatch<AppDispatch>();
  // 2. Hook para seleccionar datos del estado de Redux
  const { products, loading, error } = useSelector((state: RootState) => state.users);

  // 3. Cargar productos al montar el componente (Side Effect)
  useEffect(() => {
   if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
}, [dispatch, products.length, loading]);

  // 4. Manejador de Eliminación
  const handleDelete = (productId: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto con ID: ${productId}?`)) {
      dispatch(deleteProduct(productId));
    }
  };

  if (loading) return <p className="text-center text-xl">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 tracking-wider">Stock</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 tracking-wider">Precio</th>
            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatQuantity(product.stock)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(product.price)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center gap-2">
                {/* Enlace para editar */}
                <Link
                  to={`/edit/${product.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Editar
                </Link>
                {/* Botón para eliminar */}
                <button
                  onClick={() => handleDelete(product.id)}
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

export default ProductsList;
