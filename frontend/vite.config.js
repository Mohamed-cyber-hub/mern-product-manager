import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target:
          'https://mern-product-manager-4xwwn706i-mohamed-cyber-hubs-projects.vercel.app', // Adjust the target to your backend server
      },
    },
  },
});
