/* eslint-disable @typescript-eslint/ban-ts-comment */

import {QueryClient} from 'react-query'

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

export {queryClient}
