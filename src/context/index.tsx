/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import {QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {BrowserRouter as Router} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'

import {queryClient} from '@app/models/QueryClient/index'
import {AuthProvider} from '@app/context/auth-context'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
function AppProviders({
  children,
}: {
  children: React.ReactNode
}): EmotionJSX.Element {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Router>
            {' '}
            <AuthProvider>{children}</AuthProvider>
          </Router>
        </ChakraProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

export {AppProviders}
