import {QueryClient, UseMutationOptions} from 'react-query'
function getDefaultMutationOptions<T, R, Q, P>(
  queryClient: QueryClient,
  queryCacheKey = 'list-items',
): UseMutationOptions<T, R, Q, P> {
  return {
    onSettled: () => queryClient.invalidateQueries(queryCacheKey),
  }
}

export {getDefaultMutationOptions}
