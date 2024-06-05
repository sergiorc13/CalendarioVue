import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    outDir: 'docs', // Esto es importante para GitHub Pages, ya que servirá el contenido desde la carpeta 'docs'
    assetsDir: '.', // La ruta de acceso a los activos (por ejemplo, imágenes, archivos CSS) será relativa a la raíz del sitio
  },
  publicDir: './', // Esta es la opción equivalente a 'base' para especificar la ruta base de tu aplicación
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Ruta de alias para resolver las importaciones de módulos
    },
  },
});
