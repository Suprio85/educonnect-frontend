// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',            
    setupFiles: './src/setupTests.ts',
    globals: true,                   
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',                
      reporter: ['text', 'lcov'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/vite-env.d.ts']
    }
  },
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
   optimizeDeps: {
    // Force Vite to pre-bundle Quill so the mock works
    include: ["quill"],
  },
});
