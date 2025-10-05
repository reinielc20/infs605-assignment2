// Import the defineConfig helper function from Vite.
// This helps with syntax highlighting, autocompletion, and clearer configuration.
import { defineConfig } from 'vite'

// Import the official Vite plugin for React.
// This plugin allows Vite to understand and optimize React code (JSX/TSX syntax).
import react from '@vitejs/plugin-react'

// Export the configuration object for Vite.
// This tells Vite how to behave when running the app.
export default defineConfig({
  
  // The "plugins" array lists extra tools or features Vite should use.
  // Here, we add the React plugin so that React code will compile correctly.
  plugins: [react()],

  // The "server" section configures the development server
  // that runs when you type "npm run dev" or when the container starts.
  server: {
    // By default, Vite binds to "localhost" — but that only works
    // *inside your computer*. In Docker, "localhost" refers to the container itself.
    //
    // Setting host to "0.0.0.0" means “listen on all available network interfaces.”
    // This makes the development server reachable from outside the container,
    // e.g. on your host machine via http://localhost:3000.
    host: '0.0.0.0',

    // This sets the port that the Vite development server will use.
    // Port 3000 matches what is exposed in the Dockerfile and docker-compose.yml.
    port: 3000
  }
})