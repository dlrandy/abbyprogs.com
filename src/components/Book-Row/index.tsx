import {Link} from 'react-router-dom'
import * as mq from '@app/styles/media-queries'
import * as colors from '@app/styles/colors'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import {useListItem} from '@app/hooks/book/listItem'
import {StatusButtons} from '@app/components/StatusButton/index'
import {Rating} from '@app/components/Rating/index'
import {isReadBook} from '@app/types/tools'

function BookRow({book}: {book: ReadBook | Book}): EmotionJSX.Element {
  const {title, author, coverImageUrl} = book
  const listItem = useListItem(book)
  const bookId = isReadBook(book) ? book.bookId : book.id
  const id = `book-row-book-${bookId}`

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <Link
        to={`/book/${bookId}`}
        css={{
          minHeight: 270,
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          aria-labelledby={id}
          css={{
            minHeight: 270,
            flexGrow: 2,
            display: 'grid',
            gridTemplateColumns: '140px 1fr',
            gridGap: 20,
            border: `1px solid ${colors.gray20}`,
            color: colors.text,
            padding: '1.25em',
            borderRadius: '3px',
            ':hover,:focus': {
              textDecoration: 'none',
              boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
              color: 'inherit',
            },
          }}
        >
          <div
            css={{
              width: 140,
              [mq.small]: {
                width: 100,
              },
            }}
          >
            <img
              src={coverImageUrl}
              alt={`${title} book cover`}
              css={{maxHeight: '100%', width: '100%'}}
            />
          </div>
          <div css={{flex: 1}}>
            <div css={{display: 'flex', justifyContent: 'space-between'}}>
              <div css={{flex: 1}}>
                <h2
                  id={id}
                  css={{
                    fontSize: '1.25em',
                    margin: '0',
                    color: colors.indigo,
                  }}
                >
                  {title}
                </h2>
                {listItem?.finishDate ? <Rating book={listItem} /> : null}
              </div>
              <div css={{marginLeft: 10}}>
                <div
                  css={{
                    marginTop: '0.4em',
                    fontStyle: 'italic',
                    fontSize: '0.85em',
                  }}
                >
                  {author}
                </div>
                <small>{book.publisher}</small>
              </div>
            </div>
            <small css={{whiteSpace: 'break-spaces', display: 'block'}}>
              {book.synopsis?.substring(0, 500)}...
            </small>
          </div>
        </div>
      </Link>
      <div
        css={{
          marginLeft: '20px',
          position: 'absolute',
          right: -20,
          color: colors.gray80,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
        }}
      >
        <StatusButtons book={book} />
      </div>
    </div>
  )
}

export {BookRow}
