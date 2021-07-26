import { defineConfig } from 'vite'
import react from "vite-preset-react";
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr'
 
import { name, version } from './package.json';
 


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ removeDevtoolsInProd: true, injectReact: false }), svgr()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/'),
    }
  },
  define: {
    pkgJson: { name, version }
  },
});
