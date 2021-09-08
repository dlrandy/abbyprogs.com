import * as React from 'react'
import {BookListUL} from '@app/components/lib/index'
import {BookRow} from '@app/components/Book-Row/index'
import {useListBookItemList} from '@app/hooks/book'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'

function ListItemList({
  filterListItems,
  noListItems,
  noFilteredListItems,
}): EmotionJSX.Element {
  const {data} = useListBookItemList() || {}
  const filteredListItems = Array.isArray(data?.listBooks)
    ? data?.listBooks.filter(filterListItems)
    : []

  if (!data?.listBooks?.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }
  if (!filteredListItems?.length) {
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
