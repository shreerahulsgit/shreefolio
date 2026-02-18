import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/',
    plugins: [react()],
    build: { outDir: 'dist', assetsDir: 'assets', emptyOutDir: true },
    server: {
        port: 3001, strictPort: true,
        hmr: { overlay: true }
    },
    cacheDir: '.vite-cache',
})
