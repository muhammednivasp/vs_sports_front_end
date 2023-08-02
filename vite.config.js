import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: {
  //     buffer: 'buffer/',
  //   },
  //   resolve: {
  //     alias: {
  //       util: 'util/',
  //     },
  //   },
  // },
  plugins: [react()],
})