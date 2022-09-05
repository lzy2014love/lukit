import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LKUtil',
      fileName: (format) => `index.${format}.js`,
      formats: ['umd', 'es']
    },
    rollupOptions: {
      // // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue'],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     vue: 'Vue',
      //   },
      // },
    },
  },
})
