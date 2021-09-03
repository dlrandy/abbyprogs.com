import {client} from '@app/utils/api-client'
import * as auth from '@app/auth/provider'
async function getBookById(bookId: string): Promise<{book: Book} | null> {
  let book = null

  const token = await auth.getToken()
  if (token) {
    const data = await client<unknown, {book: Book} | null>(`books/${bookId}`, {
      token,
    })
    book = data
  }

  return book
}
async function queryBook(query: string): Promise<{books: Book[] | null}> {
  let books = null

  const token = await auth.getToken()
  if (token) {
    const data = await client<unknown, {books: Book[]}>(
      `books?query=${encodeURIComponent(query)}`,
      {token},
    )
    books = data.books
  }

  return {books}
}
async function getListBooks(): Promise<{listBooks: Book[] | null}> {
  let listBooks = null

  const token = await auth.getToken()
  if (token) {
    const data = await client<unknown, {listItems: Book[]}>(`list-items`, {
      token,
    })
    listBooks = data.listItems
  }

  return {listBooks}
}

export {getBookById, queryBook, getListBooks}
