import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  server:{
    host:'0.0.0.0',//解决vite use--host to expose
    port:5173,
    open:true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
