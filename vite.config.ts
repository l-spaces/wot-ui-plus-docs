import { defineConfig } from 'vite'
import visualizer from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    UnoCSS(),
    //代码组图标
    groupIconVitePlugin({
      customIcon: {
        js: 'logos:javascript', //js图标
        md: 'logos:markdown', //markdown图标
        css: 'logos:css-3' //css图标
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
