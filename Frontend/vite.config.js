import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.47.76:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react()],
});  
