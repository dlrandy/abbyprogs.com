// dynamically export the server based on the environment
// using CommonJS in this file because it's a bit simpler
// even though mixing CJS and ESM is not typically recommended
// It is possible to do this with ESM using `codegen.macro`
// and you can take a look at an example of this here:
// https://github.com/kentcdodds/bookshelf/blob/aef4f122428718ff422e203c6a68301dca50b396/src/test/server/index.js

async function loadMyModule() {
  let url = ''
  if (process.env.NODE_ENV === 'development') {
    url = './dev-server'
  } else if (process.env.NODE_ENV === 'test') {
    url = './test-server'
  }
  /* @vite-ignore */
  ;(await url) && import(url)
}

loadMyModule()
