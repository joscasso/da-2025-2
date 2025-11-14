import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'; // 👈 Importa tailwindcss

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),], 

 build: {
    target: 'es2020', // Mantener el target de producción
  },  
})
