import {defineConfig} from 'vite'
import react from 'vite-preset-react'
import {resolve} from 'path'
import svgr from 'vite-plugin-svgr'
import WindiCSS from 'vite-plugin-windicss'
import macrosPlugin from 'vite-plugin-babel-macros'
import {name, version} from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: 'import { jsx } from "@emotion/react"',
  },
  plugins: [
    react({removeDevtoolsInProd: true, injectReact: false}),
    svgr(),
    WindiCSS(),
    macrosPlugin(),
  ],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/'),
    },
  },
  define: {
    pkgJson: {name, version},
  },
})
