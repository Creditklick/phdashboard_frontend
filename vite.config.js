// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })



// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';
// // import path from 'path';

// // export default defineConfig({
// //   plugins: [react(),tailwindcss()],
// //   resolve: {
// //     alias: {
// //       '@': path.resolve(__dirname, './src'),
// //       '@components': path.resolve(__dirname, './src/components'),
// //     },
// //   },
// // });



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // <-- required
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
    
  },
   server: {
    host: '0.0.0.0',
  },
});
