import { defineConfig } from 'vite';

export default defineConfig({
  // Set the base URL of your application (e.g. /my-app/)
    base: '/personal-website/',

  // Define your entry point file
  // (e.g. index.html, main.ts, main.js, etc.)
  // Vite will automatically determine the correct type based on the file extension
  // and use the appropriate plugin (e.g. vite-plugin-react for .tsx files)
  // to handle the file
    root: '.',

  // Configure the output directory for your built files
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },

  // Configure the development server
    server: {
        // Set the port for the development server
        port: 3000,
        
        // Enable hot module replacement (HMR) for faster development
        hmr: true,
    },

  // Add any additional plugins or configuration here
});