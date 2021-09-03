import {queryBook, getListBooks} from '@app/services/Book/index'
import {loadingBooks} from '@app/models/Book/index'
import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  QueryClient,
} from 'react-query'
import React from 'react'

const getBookSearchConfig = (queryClient: QueryClient, query: string) => ({
  queryKey: ['bookSearch', {query}],
  queryFn: () => queryBook(encodeURIComponent(query)),
  onSuccess(data: {books: Book[] | null}) {
    if (!data.books) {
      return
    }
    for (const book of data.books) {
      queryClient.setQueryData(['book', {bookId: book.id}], book)
    }
  },
})

function useBookSearch(query: string): UseQueryResult<
  {
    books: Book[] | null
  },
  Error
> {
  const queryClient = useQueryClient()
  const result = useQuery<{books: Book[] | null}, Error>(
    getBookSearchConfig(queryClient, query),
  )
  if (result.data) {
    result.data.books = result.data?.books ?? loadingBooks
  }
  return result
}
function useRefetchBookSearchQuery(): () => void {
  const queryClient = useQueryClient()
  return React.useCallback(() => {
    queryClient.removeQueries('bookSearch')
    queryClient.prefetchQuery(getBookSearchConfig(queryClient, ''))
  }, [queryClient])
}

function useListBookItemList(): UseQueryResult<
  {
    listBooks: Book[] | null
  },
  Error
> {
  const result = useQuery<{listBooks: Book[] | null}, Error>({
    queryKey: 'list-items',
    queryFn: () => getListBooks(),
  })
  return result
}
export {useBookSearch, useRefetchBookSearchQuery, useListBookItemList}
