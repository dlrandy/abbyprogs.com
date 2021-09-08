type Book = {
  id?: string
  bookId?: string
  title?: string
  author?: string
  rating?: number
  coverImageUrl?: string
  publisher?: string
  synopsis?: string
  loadingBook?: boolean
}
type ReadBook = Book & {
  finishDate?: number
  startDate?: number
  notes?: string
}
