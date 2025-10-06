import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', backgroundColor: '#eee' }}>
      
      {/* Usamos NavLink y tipamos el argumento de la función 'style' o 'className'. 
        React Router proporciona la interfaz 'NavLinkRenderProps' implícitamente.
      */}
      <NavLink 
        to="/" 
        style={({ isActive }: { isActive: boolean }) => ({ 
          color: isActive ? 'green' : 'black', 
          fontWeight: isActive ? 'bold' : 'normal' 
        })}
      >
        Inicio
      </NavLink>

      <NavLink 
        to="/about"
        style={({ isActive }: { isActive: boolean }) => ({ 
          color: isActive ? 'green' : 'black', 
          fontWeight: isActive ? 'bold' : 'normal' 
        })}
      >
        Acerca de
      </NavLink>


     <NavLink 
        to="/contact"
        style={({ isActive }: { isActive: boolean }) => ({ 
          color: isActive ? 'green' : 'black', 
          fontWeight: isActive ? 'bold' : 'normal' 
        })}
      >
        Contactanos
      </NavLink>      
      
      <NavLink 
        to="/dashboard"
        style={({ isActive }: { isActive: boolean }) => ({ 
          color: isActive ? 'red' : 'black', 
          fontWeight: isActive ? 'bold' : 'normal' 
        })}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

export default NavBar;
