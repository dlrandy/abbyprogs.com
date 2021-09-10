import * as React from 'react'
import {Link} from '@app/components/lib'
import {ListItemList} from '@app/components/List-Item-List'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
function ReadingListScreen(): EmotionJSX.Element {
  return (
    <ListItemList
      filterListItems={(li: ReadBook) => !li.finishDate}
      noListItems={
        <p>
          Hey there! Welcome to your bookshelf reading list. Get started by
          heading over to <Link to="/discover">the Discover page</Link> to add
          books to your list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've finished all your books! Check them out in your{' '}
          <Link to="/finished">finished books</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  )
}

export {ReadingListScreen}
