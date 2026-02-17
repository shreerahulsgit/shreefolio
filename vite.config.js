import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/',
    plugins: [react()],
    build: {
        outDir: 'dist', // Cloudflare Pages expects output in dist
        assetsDir: 'assets',
        emptyOutDir: true,
    },
    server: {
        port: 3001,           // Unique port for this project
        strictPort: true,     // Fail if port is already in use
        hmr: {
            overlay: true,    // Show errors as overlay
        },
    },
    cacheDir: '.vite-cache-portfolio',  // Project-specific cache directory
})
