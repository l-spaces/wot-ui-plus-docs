import { defineConfig } from 'vite'
import visualizer from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'

export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    UnoCSS(),
    // Components({
    //   dirs: ['.vitepress/components'],
    //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    // }),
    groupIconVitePlugin({
      // customIcon 可选，按需配置
      customIcon: {
        postcss: 'vscode-icons:file-type-postcss'
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        }
      }
    }
  }
})
