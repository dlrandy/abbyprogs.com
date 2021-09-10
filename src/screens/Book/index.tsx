import * as React from 'react'
import tw from 'twin.macro'
import {useParams} from 'react-router-dom'
import debounceFn from 'debounce-fn'
import {Spinner, Tooltip} from '@chakra-ui/react'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import * as mq from '@app/styles/media-queries'
import * as colors from '@app/styles/colors'
import {loadingBook} from '@app/models/Book/index'
import {useBook} from '@app/hooks/book'
import {useListItem, useUpdateListItem} from '@app/hooks/book/listItem'
import {ErrorMessage, Textarea} from '@app/components/lib'
import {StatusButtons} from '@app/components/StatusButton/index'
import {Rating} from '@app/components/Rating/index'
import {formatDate} from '@app/utils/misc'

function BookScreen(): EmotionJSX.Element {
  const {bookId} = useParams()
  const data = useBook(bookId)
  const book = data.data?.book ?? loadingBook
  const {title, author, coverImageUrl, publisher, synopsis} = book
  const listItem = useListItem(book)
  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{width: '100%', maxWidth: '14rem'}}
        />
        <div>
          <div css={{display: 'flex', position: 'relative'}}>
            <div css={{flex: 1, justifyContent: 'space-between'}}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={{
                right: 0,
                color: colors.gray80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: 100,
              }}
            >
              {book.loadingBook ? null : <StatusButtons book={book} />}
            </div>
          </div>
          <div css={{marginTop: 10, height: 46}}>
            {listItem?.finishDate ? <Rating book={listItem} /> : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
      {!book.loadingBook && listItem ? (
        <NotesTextarea listItem={listItem} />
      ) : null}
    </div>
  )
}

function ListItemTimeframe({
  listItem,
}: {
  listItem: ReadBook
}): EmotionJSX.Element {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{marginTop: 6}}>
        <FaRegCalendarAlt css={{marginTop: -2, marginRight: 5}} />
        <span>
          {listItem.startDate && formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({listItem}: {listItem: ReadBook}) {
  const {mutate, error, isError, isLoading} = useUpdateListItem()

  const debouncedMutate = React.useMemo(
    () => debounceFn(mutate, {wait: 300}),
    [mutate],
  )

  function handleNotesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    debouncedMutate({id: listItem.id, notes: e.target.value})
  }

  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
        {isError ? (
          <ErrorMessage
            variant="inline"
            error={error as Error}
            css={{fontSize: '0.7em'}}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        css={{width: '100%', minHeight: 300}}
      />
    </React.Fragment>
  )
}
export {BookScreen}
