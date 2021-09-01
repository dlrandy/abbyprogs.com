import * as React from 'react'
import tw from 'twin.macro'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router} from 'react-router-dom'

import '@app/server/index'
import {AuthenticatedApp, UnauthenticatedApp} from '@app/apps'
import * as auth from '@app/auth/provider'
import {getUser} from '@app/services/User/index'
import {useAsync} from '@app/utils/hooks'
import * as colors from '@app/styles/colors'
import {FullPageSpinner} from '@app/components/lib/index'
function App(): React.ReactNode {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync<User | null, Error>()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = (form: UserData) => auth.login(form).then(u => setData(u))
  const register = (form: UserData) => auth.register(form).then(u => setData(u))
  const logout = () => {
    auth.logout()
    setData(null)
  }
  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }
  if (isError) {
    return (
      <div
        css={[
          tw`flex flex-col justify-center items-center h-screen`,
          {
            color: colors.danger,
          },
        ]}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    const props = {user, login, register, logout}

    return (
      <ChakraProvider>
        {user ? (
          <Router>
            <AuthenticatedApp {...props} user={user} />
          </Router>
        ) : (
          <UnauthenticatedApp {...props} />
        )}
      </ChakraProvider>
    )
  }
}

export default App
