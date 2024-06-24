import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname,'src')
      }
    ]
  },
  server: {
    port: 3033
  }
})
