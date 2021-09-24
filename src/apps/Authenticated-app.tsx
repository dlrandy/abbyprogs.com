import * as React from 'react'
import tw, {css} from 'twin.macro'
import {ErrorBoundary} from 'react-error-boundary'
import {
  Routes,
  Route,
  Link as RouterLink,
  LinkProps,
  useMatch,
} from 'react-router-dom'
import {
  Button,
  ErrorMessage,
  FullPageErrorFallback,
} from '@app/components/lib/index'
import * as mq from '@app/styles/media-queries'
import * as colors from '@app/styles/colors'
import {DiscoverBooksScreen} from '@app/screens/Discover/index'
import {BookScreen} from '@app/screens/Book/index'
import {ReadingListScreen} from '@app/screens/ReadingList/index'
import {FinishedScreen} from '@app/screens/Finished/index'
import {NotFoundScreen} from '@app/screens/NotFound/index'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import {useAuth} from '@app/context/auth-context'

function ErrorFallback({error}: {error: Error}): EmotionJSX.Element {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp(): EmotionJSX.Element {
  const {user, logout} = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div css={[tw` flex items-center absolute top-4 right-4 `]}>
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        css={[
          tw` my-0 mx-auto max-w-screen-md w-full grid 
          gap-4  grid-cols-[1fr,2fr]`,
          {
            [mq.small]: {
              gridTemplateColumns: '1fr',
              gridTemplateRows: 'auto',
              width: '100%',
            },
          },
        ]}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main css={[tw`w-full`]}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}
function NavLink(props: LinkProps): EmotionJSX.Element {
  const match = useMatch(props.to.toString())

  return (
    <RouterLink
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.text,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          ':hover': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover': {
                background: colors.gray10,
              },
            }
          : null,
      ]}
      {...props}
    />
  )
}
function Nav(): EmotionJSX.Element {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes(): EmotionJSX.Element {
  return (
    <Routes>
      <Route path="/list" element={<ReadingListScreen />} />
      <Route path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {AuthenticatedApp}
