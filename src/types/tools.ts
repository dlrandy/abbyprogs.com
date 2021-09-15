function isReadBook(book: Book | ReadBook): book is ReadBook {
  return 'bookId' in book
}

export {isReadBook}
