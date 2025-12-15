import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite para el proyecto React. Definimos el puerto
// predeterminado para el entorno de desarrollo para evitar conflictos.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});