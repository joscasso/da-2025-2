// src/App.tsx
import UserProfileCard from './components/UserProfileCard';
import './App.css'; // Asegúrate de importar tu CSS

// Componente para manejar el Dark Mode
function DarkModeToggle () {
  // Nota: En un proyecto real, usarías un hook para gestionar el estado
  return (
    <button
      className="p-2 border rounded-lg bg-gray-100 text-deep-gray border-gray-300
                 dark:bg-gray-800 dark:text-white dark:border-gray-700
                 hover:shadow-lg transition-all"
      onClick={() => {
        // Simulación: añade o quita la clase 'dark' al body para activar Dark Mode
        document.documentElement.classList.toggle('dark');
      }}
    >
      Toggle Dark Mode
    </button>
  );
}

function App() {
  return (
    // 1. Dark Mode: El prefijo 'dark:' aplica estilos cuando la clase 'dark' está en un ancestro (ej. <html> o <body>)
    // 2. Responsive: El prefijo 'sm:' y 'lg:' permite cambiar el diseño
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-blue-900 flex flex-col items-center">
      
      {/* El botón de Dark Mode */}
      <div className="w-full max-w-4xl flex justify-end mb-10">
        <DarkModeToggle />
      </div>

      {/* Contenedor principal para demostrar responsive */}
      <div 
        className="w-full max-w-4xl p-4 grid gap-8 
                   sm:grid-cols-1 
                   md:grid-cols-2 
                   lg:grid-cols-3" // CAMBIO RESPONSIVE: De 1 columna a 3 en pantallas grandes
      >
        <UserProfileCard
          name="Alex Rivera"
          role="Desarrollador Frontend"
          bio="Apasionado por crear interfaces de usuario limpias y eficientes usando React y la filosofía utility-first de Tailwind."
          imageUrl="https://via.placeholder.com/150/5850EC/FFFFFF?text=A"
          status="online"
        />

        <UserProfileCard
          name="Sara Connor"
          role="Diseñadora UX/UI"
          bio="Me centro en la experiencia del usuario y la accesibilidad. Diseño sistemas de componentes modulares."
          imageUrl="https://via.placeholder.com/150/F29D99/FFFFFF?text=S"
          status="offline"
        />

        {/* Ejemplo con un rol largo y status online */}
        <UserProfileCard
          name="Ben Foster"
          role="Ingeniero de Software Senior & Mentor"
          bio="Construyo y escalo aplicaciones full-stack con la mejor experiencia de desarrollo."
          imageUrl="https://via.placeholder.com/150/4CAF50/FFFFFF?text=B"
          status="online"
        />
        
      </div>

      {/* 3. Hovers: El ejemplo del botón ya usa hover:bg-brand-light */}

      {/* 4. Uso de la variable de espaciado personalizada (p-18) */}
      <div className="mt-10 p-18 bg-brand-primary text-white rounded-lg">
        <p className="text-center">Espaciado personalizado con 'p-18'</p>
      </div>
    </div>
  );
}

export default App;
