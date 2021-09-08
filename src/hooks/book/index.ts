import {
  queryBook,
  getListBooks,
  updateListBook,
  getBookById,
  createListBook,
  deleteListBook,
} from '@app/services/Book/index'
import {loadingBooks} from '@app/models/Book/index'
import {
  useQuery,
  useMutation,
  UseQueryResult,
  useQueryClient,
  QueryClient,
  UseMutationResult,
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
    listBooks: ReadBook[] | null
  },
  Error
> {
  const result = useQuery<{listBooks: ReadBook[] | null}, Error>({
    queryKey: 'list-items',
    queryFn: () => getListBooks(),
  })
  return result
}
function useBookGet(bookId: string): UseQueryResult<
  {
    book: Book | null
  },
  Error
> {
  const result = useQuery<{book: Book | null}, Error>({
    queryKey: ['book', {bookId}],
    queryFn: () => getBookById(bookId),
  })
  return result
}
function useListBookItemUpdate(): UseMutationResult<void, Error, ReadBook> {
  const queryClient = useQueryClient()
  return useMutation((book: ReadBook) => updateListBook(book), {
    onSettled: () => queryClient.invalidateQueries('list-items'),
  })
}
function useListBookItemDelete(): UseMutationResult<void, Error, ReadBook> {
  const queryClient = useQueryClient()
  return useMutation((book: ReadBook) => deleteListBook(book), {
    onSettled: () => queryClient.invalidateQueries('list-items'),
  })
}
function useListBookItemCreate(): UseMutationResult<void, Error, ReadBook> {
  const queryClient = useQueryClient()
  return useMutation((book: ReadBook) => createListBook(book), {
    onSettled: () => queryClient.invalidateQueries('list-items'),
  })
}
export {
  useBookSearch,
  useBookGet,
  useRefetchBookSearchQuery,
  useListBookItemList,
  useListBookItemUpdate,
  useListBookItemDelete,
  useListBookItemCreate,
}
