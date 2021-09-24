import * as React from 'react'
import tw from 'twin.macro'

import {AuthenticatedApp, UnauthenticatedApp} from '@app/apps'
import {useAuth} from '@app/context/auth-context'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
function App(): EmotionJSX.Element | null {
  const {user} = useAuth()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
