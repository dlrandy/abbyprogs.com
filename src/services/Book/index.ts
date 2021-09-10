import {client} from '@app/utils/api-client'
import * as auth from '@app/auth/provider'
import {stopFunc} from '@app/utils/tools'

async function getBookById(bookId: string): Promise<{book: Book | null}> {
  const token = await auth.getToken()
  if (token) {
    return await client<unknown, {book: Book}>(`books/${bookId}`, {
      token,
    })
  }

  stopFunc()
}
async function queryBook(query: string): Promise<{books: Book[] | null}> {
  const token = await auth.getToken()
  if (token) {
    return await client<unknown, {books: Book[]}>(
      `books?query=${encodeURIComponent(query)}`,
      {token},
    )
  }

  stopFunc()
}
async function getBook(bookId: string): Promise<{book: Book | null}> {
  const token = await auth.getToken()
  if (token) {
    return await client<unknown, {book: Book | null}>(`books/${bookId}`, {
      token,
    })
  }
  stopFunc()
}
async function getListBooks(): Promise<{listItems: ReadBook[]}> {
  const token = await auth.getToken()
  if (token) {
    const data = await client<unknown, {listItems: ReadBook[]}>(`list-items`, {
      token,
    })
    return data
  }

  stopFunc()
}
async function updateListBook(updates: ReadBook): Promise<MutationResponse> {
  const token = await auth.getToken()
  if (token) {
    const data = await client<ReadBook, MutationResponse>(
      `list-items/${updates.id}`,
      {
        token,
        method: 'PUT',
        data: updates,
      },
    )
    return data
  }
  stopFunc()
}
async function deleteListBook(updates: ReadBook): Promise<MutationResponse> {
  const token = await auth.getToken()
  if (token) {
    return await client<ReadBook, MutationResponse>(
      `list-items/${updates.id}`,
      {
        token,
        method: 'Delete',
      },
    )
  }
  stopFunc()
}
async function createListBook(updates: ReadBook): Promise<MutationResponse> {
  const token = await auth.getToken()
  if (token) {
    return await client<ReadBook, MutationResponse>(`list-items`, {
      token,
      data: {bookId: updates.bookId},
    })
  }
  stopFunc()
}

export {
  getBookById,
  queryBook,
  getBook,
  getListBooks,
  deleteListBook,
  createListBook,
  updateListBook,
}
