import * as React from 'react'
import * as colors from '@app/styles/colors'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import {FaStar} from 'react-icons/fa'
import {visuallyHiddenCSS} from '@app/styles/utils'
import {useListBookItemUpdate} from '@app/hooks/book'
type BookProps = {
  book: ReadBook
}

function Rating({book}: BookProps): EmotionJSX.Element {
  const [isTabbing, setIsTabbing] = React.useState(false)

  const rootClassName = `list-item-${book.id}`
  const listBookUpdater = useListBookItemUpdate()
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        setIsTabbing(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown, {once: true})
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const stars = Array.from({length: 5}).map((x, i) => {
    const ratingId = `rating-${book.id}-${i}`
    const ratingValue = i + 1

    return (
      <React.Fragment key={i}>
        <input
          name={rootClassName}
          type="radio"
          id={ratingId}
          value={ratingValue}
          checked={ratingValue === book.rating}
          onChange={() => {
            listBookUpdater.mutate({id: book.id, rating: ratingValue})
          }}
          css={[
            visuallyHiddenCSS,
            {
              [`.${rootClassName} &:checked ~ label`]: {color: colors.gray20},
              [`.${rootClassName} &:checked + label`]: {color: 'orange'},
              [`.${rootClassName} &:hover ~ label`]: {
                color: `${colors.gray20} !important`,
              },
              [`.${rootClassName} &:hover + label`]: {
                color: 'orange !important',
              },
              [`.${rootClassName} &:focus + label svg`]: {
                outline: isTabbing
                  ? ['1px solid orange', '-webkit-focus-ring-color auto 5px']
                  : 'initial',
              },
            },
          ]}
        />
        <label
          htmlFor={ratingId}
          css={{
            cursor: 'pointer',
            color: Number(book.rating) < 0 ? colors.gray20 : 'orange',
            margin: 0,
          }}
        >
          <span css={visuallyHiddenCSS}>
            {ratingValue} {ratingValue === 1 ? 'star' : 'stars'}
          </span>
          <FaStar css={{width: '16px', margin: '0 2px'}} />
        </label>
      </React.Fragment>
    )
  })
  return (
    <div
      onClick={e => e.stopPropagation()}
      className={rootClassName}
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        [`&.${rootClassName}:hover input + label`]: {
          color: 'orange',
        },
      }}
    >
      <span css={{display: 'flex'}}>{stars}</span>
    </div>
  )
}

export {Rating}
