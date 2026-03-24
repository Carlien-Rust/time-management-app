import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite'; // Import the plugin

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true, // Optional: enables automatic code splitting
    }),
    react(),
  ],
  envDir: './environments',
});
