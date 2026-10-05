import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],

    server: {
      port: 8000, 
      host: 'localhost', 
      
      // Updated for FindUrPG
      allowedHosts: [
        'findurpg.com',        // Your main domain
        '.findurpg.com',       // Wildcard: allows www.findurpg.com, api.findurpg.com, etc.
        '.pages.dev'           // Allows Cloudflare preview deployments
      ]
    }
  };
});
