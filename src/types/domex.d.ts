import {QueryClient} from 'react-query'
declare global {
  interface Window {
    __devtools?: {
      setQueryClient?: (client: QueryClient) => void
    }
  }
}
