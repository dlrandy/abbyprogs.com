import * as React from 'react'
import {Tooltip} from '@chakra-ui/react'
import {FaSearch} from 'react-icons/fa'
import tw from 'twin.macro'
import {Input, BookListUL, Spinner} from '@app/components/lib'
import {BookRow} from '@app/components/Book-Row/index'
import {client} from '@app/utils/api-client'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import * as colors from '@app/styles/colors'
import {useAsync} from '@app/utils/hooks'
function DiscoverBooksScreen(): EmotionJSX.Element {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync<
    {books: Book[]},
    {message: string}
  >()

  const [query, setQuery] = React.useState('')

  const [queried, setQueried] = React.useState(false)

  React.useEffect(() => {
    if (!queried) {
      return
    }

    run(client(`books?query=${encodeURIComponent(query)}`))
  }, [query, queried, run])

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
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>
      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
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
