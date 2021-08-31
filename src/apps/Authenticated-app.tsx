import * as React from 'react'
import tw from 'twin.macro'
import {Button} from '@app/components/lib/index'
import * as mq from '@app/styles/media-queries'
import {DiscoverBooksScreen} from '@app/screens/Discover/index'

type AuthenticatedAppProps = {
  user: User
  logout: () => void
}
function AuthenticatedApp({user, logout}: AuthenticatedAppProps): JSX.Element {
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
        <DiscoverBooksScreen />
      </div>
    </React.Fragment>
  )
}

export {AuthenticatedApp}
