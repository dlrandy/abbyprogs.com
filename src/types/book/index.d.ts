type Book = CommonBook & {
  id?: string
  loadingBook?: boolean
}
type ReadBook = CommonBook & {
  bookId?: string
  finishDate?: number
  startDate?: number
  notes?: string
}

type CommonBook = {
  title?: string
  author?: string
  rating?: number
  coverImageUrl?: string
  publisher?: string
  synopsis?: string
}
