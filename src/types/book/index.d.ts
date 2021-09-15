interface Book extends CommonBook {
  id?: string
  loadingBook?: boolean
}
interface ReadBook extends CommonBook {
  book?: Book
  bookId?: string
  finishDate?: number
  startDate?: number
  notes?: string
}

interface CommonBook {
  title?: string
  author?: string
  rating?: number
  coverImageUrl?: string
  publisher?: string
  synopsis?: string
}
