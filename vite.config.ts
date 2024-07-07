import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'), // 指定组件编译入口文件
      name: 'AnimationNumber',
      fileName: 'anmiation-number'
    }, // 库编译模式配置
    rollupOptions: { // rollup打包配置
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        }
      }
    }
  }
})
