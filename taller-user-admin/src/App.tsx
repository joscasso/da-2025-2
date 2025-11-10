import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

function App() {
  return (
    // 1. Configurar el Router
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          ⚙️ Administración de Usuarios
        </h1>
        {/* Navegación Simple */}
        <nav className="mb-4 flex gap-4 justify-center">
          <Link to="/" className="text-blue-500 hover:text-blue-800 font-semibold">
            Lista de Usuarios
          </Link>
          <span> | </span>
          <Link to="/add" className="text-green-500 hover:text-green-800 font-semibold">
            Añadir Usuario
          </Link>
        </nav>
        <hr className="mb-4" />

        {/* 2. Definición de Rutas */}
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} /> {/* Ruta con parámetro de ID */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
