import * as React from 'react'
import tw from 'twin.macro'
import {Routes, Route, Link, LinkProps} from 'react-router-dom'
import {Button} from '@app/components/lib/index'
import * as mq from '@app/styles/media-queries'
import * as colors from '@app/styles/colors'
import {DiscoverBooksScreen} from '@app/screens/Discover/index'
import {BookScreen} from '@app/screens/Book/index'
import {NotFoundScreen} from '@app/screens/NotFound/index'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'

type AuthenticatedAppProps = {
  user: User
  logout: () => void
  [key: string]: unknown
}
function AuthenticatedApp({
  user,
  logout,
}: AuthenticatedAppProps): EmotionJSX.Element {
  return (
    <React.Fragment>
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
          <AppRoutes user={user} />
        </main>
      </div>
    </React.Fragment>
  )
}
function NavLink(props: LinkProps): EmotionJSX.Element {
  return (
    <Link
      css={{
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
      }}
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
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes({user}: {user: User}): JSX.Element {
  return (
    <Routes>
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen user={user} />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export {AuthenticatedApp}
