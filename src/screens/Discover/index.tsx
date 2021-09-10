import * as React from 'react'
import {Tooltip} from '@chakra-ui/react'
import {FaSearch, FaTimes} from 'react-icons/fa'
import tw from 'twin.macro'
import {Input, BookListUL, Spinner} from '@app/components/lib'
import {BookRow} from '@app/components/Book-Row/index'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import * as colors from '@app/styles/colors'

import {useBookSearch, useRefetchBookSearchQuery} from '@app/hooks/book'
function DiscoverBooksScreen(): EmotionJSX.Element {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const {data, error, isLoading, isError, isSuccess} = useBookSearch(
    encodeURIComponent(query),
  )
  const getRefetchBookSearchQuery = useRefetchBookSearchQuery()

  React.useEffect(() => {
    return () => getRefetchBookSearchQuery()
  }, [getRefetchBookSearchQuery])

  type SearchFormElementData = {
    search: {value: string}
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setQueried(true)
    const {search} = event.target as typeof event.target & SearchFormElementData
    setQuery(search.value)
  }

  return (
    <div css={[tw`w-full max-w-screen-md m-auto py-14 px-0`]}>
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes
                  css={{
                    color: colors.danger,
                  }}
                />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error?.message}</pre>
        </div>
      ) : null}
      <div>
        {queried ? null : (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : isSuccess && data && data.books?.length ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && data && data.books?.length ? (
              <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
      </div>
      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
