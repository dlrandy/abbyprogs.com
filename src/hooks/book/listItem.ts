import {
  getListBooks,
  updateListBook,
  createListBook,
  deleteListBook,
} from '@app/services/Book/index'

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseMutationOptions,
} from 'react-query'
import {getDefaultMutationOptions} from '@app/hooks/utils'

function useListItems(): ReadBook[] {
  const queryClient = useQueryClient()
  const {data} = useQuery<{listItems: ReadBook[] | null}, Error>({
    queryKey: 'list-items',
    queryFn: () => getListBooks(),
    onSuccess(data) {
      data.listItems = data.listItems || []
      for (const listItem of data.listItems) {
        queryClient.setQueryData(['book', {bookId: listItem.bookId}], listItem)
      }
    },
  })
  return data?.listItems || []
}
function useListItem(book: ReadBook): ReadBook | null {
  const listItems = useListItems()
  return listItems.find(li => li.bookId === book.id) ?? null
}

function useUpdateListItem(
  options: UseMutationOptions<
    MutationResponse,
    Error,
    ReadBook,
    () => void
  > = {},
): UseMutationResult<MutationResponse, Error, ReadBook, () => void> {
  const queryClient = useQueryClient()
  return useMutation<MutationResponse, Error, ReadBook, () => void>(
    (book: ReadBook) => updateListBook(book),
    {
      onMutate: (newItem: ReadBook) => {
        const previousItems =
          queryClient.getQueryData<ReadBook[]>('list-items') || []

        queryClient.setQueryData<ReadBook[]>('list-items', (old = []) => {
          return old.map(item =>
            item.id === newItem.id ? {...item, ...newItem} : item,
          )
        })

        return () => queryClient.setQueryData('list-items', previousItems)
      },
      ...getDefaultMutationOptions(queryClient, 'list-items'),
      ...options,
    },
  )
}
function useRemoveListItem(
  options: UseMutationOptions<
    MutationResponse,
    Error,
    ReadBook,
    () => void
  > = {},
): UseMutationResult<MutationResponse, Error, ReadBook, () => void> {
  const queryClient = useQueryClient()
  return useMutation<MutationResponse, Error, ReadBook, () => void>(
    (book: ReadBook) => deleteListBook(book),
    {
      onMutate: (removedItem: ReadBook) => {
        const previousItems =
          queryClient.getQueryData<ReadBook[]>('list-items') || []

        queryClient.setQueryData<ReadBook[]>('list-items', (old = []) => {
          return old.filter(item => item.id !== removedItem.id)
        })

        return () => queryClient.setQueryData('list-items', previousItems)
      },
      ...getDefaultMutationOptions(queryClient, 'list-items'),
      ...options,
    },
  )
}
function useCreateListItem(
  options: UseMutationOptions<MutationResponse, Error, ReadBook, void> = {},
): UseMutationResult<MutationResponse, Error, ReadBook, void> {
  const queryClient = useQueryClient()
  return useMutation<MutationResponse, Error, ReadBook, void>(
    (book: ReadBook) => createListBook(book),
    {
      ...getDefaultMutationOptions(queryClient, 'list-items'),
      ...options,
    },
  )
}
export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
}
