/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import ReactDOM from 'react-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import './index.css'
import 'virtual:windi.css'
import App from './App'
interface ResponseError extends Error {
  status?: number
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      // @ts-ignore
      retry: (failureCount: number, error: ResponseError) => {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
    mutations: {
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
    },
  },
})
// window.__devtools?.setQueryClient?.(queryClient)
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
