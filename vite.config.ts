import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from "@tanstack/router-plugin/vite"

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react()
    ],
    // ADD THIS BLOCK
    resolve: {
        dedupe: ['react', 'react-dom'],
    },
})