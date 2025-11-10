import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct.tsx';
import './App.css'

function App() {
  return (
    // 1. Configurar el Router
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          ⚙️ Administración de Inventario
        </h1>
        {/* Navegación Simple */}
        <nav className="mb-4 flex gap-4 justify-center">
          <Link to="/" className="text-blue-500 hover:text-blue-800 font-semibold">
            Lista de Productos
          </Link>
          <span> | </span>
          <Link to="/add" className="text-green-500 hover:text-green-800 font-semibold">
            Añadir Producto
          </Link>
        </nav>
        <hr className="mb-4" />

        {/* 2. Definición de Rutas */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} /> {/* Ruta con parámetro de ID */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
