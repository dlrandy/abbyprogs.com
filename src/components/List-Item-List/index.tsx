import * as React from 'react'
import {BookListUL} from '@app/components/lib/index'
import {BookRow} from '@app/components/Book-Row/index'
import {useListItems} from '@app/hooks/book/listItem'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
type ListItemListProps = {
  filterListItems: (book: ReadBook) => boolean
  noListItems: React.ReactNode
  noFilteredListItems: React.ReactNode
}
function ListItemList({
  filterListItems,
  noListItems,
  noFilteredListItems,
}: ListItemListProps): EmotionJSX.Element {
  const listBooks = useListItems() || {}
  const filteredListItems = Array.isArray(listBooks)
    ? listBooks.filter(filterListItems)
    : []

  if (!listBooks.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }
  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
    <BookListUL>
      {filteredListItems.map(book => (
        <li key={book.id}>
          <BookRow book={book} />
        </li>
      ))}
    </BookListUL>
  )
}

export {ListItemList}
