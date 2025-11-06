 import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: base must match the repo name for GH Pages
export default defineConfig({
  plugins: [react()],
  base: '/artconnect1/'
});