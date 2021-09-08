import * as React from 'react'
import tw from 'twin.macro'
import {Link} from 'react-router-dom'
import {ListItemList} from '@app/components/List-Item-List/index'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'

function FinishedScreen(): EmotionJSX.Element {
  return (
    <ListItemList
      filterListItems={li => Boolean(li.finishDate)}
      noListItems={
        <p>
          Hey there! This is where books will go when you've finished reading
          them. Get started by heading over to{' '}
          <Link to="/discover">the Discover page</Link> to add books to your
          list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've got some reading to do! Check them out in your{' '}
          <Link to="/list">reading list</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  )
}

export {FinishedScreen}
