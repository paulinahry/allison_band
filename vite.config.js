import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            pages: path.resolve(__dirname, './src/pages'),
            slices: path.resolve(__dirname, './src/redux/slices'),
        },
    },
    server: {
        port: 8000,
    },
    plugins: [react(), imagetools()],
})
