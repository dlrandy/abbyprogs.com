import * as React from 'react'
import tw from 'twin.macro'
import {useParams} from 'react-router-dom'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import {getBookById} from '@app/services/Book/index'
import * as mq from '@app/styles/media-queries'
import bookPlaceholderSvg from '@app/assets/svgs/book-placeholder.svg'
import {useAsync} from '@app/utils/hooks'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function FinishedScreen(): EmotionJSX.Element {
  const {bookId} = useParams()
  const {data, run} = useAsync<{book: Book} | null, Error>()
  React.useEffect(() => {
    run(getBookById(bookId))
  }, [run, bookId])
  const {title, author, coverImageUrl, publisher, synopsis} =
    data?.book ?? loadingBook
  return (
    <div
      css={[
        tw`grid grid-cols-[1fr,2fr] gap-8 mb-4`,
        {
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
      ]}
    >
      <img
        src={coverImageUrl}
        alt={`${title} book cover`}
        css={{width: '100%', maxWidth: '14rem'}}
      />
      <div>
        <div>
          <div>
            <h1>{title}</h1>
            <div>
              <i>{author}</i>
              <span
                css={{
                  marginRight: 6,
                  marginLeft: 6,
                }}
              >
                |
              </span>
              <i>{publisher}</i>
            </div>
          </div>
        </div>
        <br />
        <p>{synopsis}</p>
      </div>
    </div>
  )
}

export {FinishedScreen}
