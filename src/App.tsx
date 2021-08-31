import * as React from 'react'
import 'twin.macro'
import {ChakraProvider} from '@chakra-ui/react'
import '@app/server/index'
import {AuthenticatedApp, UnauthenticatedApp} from '@app/apps'
import * as auth from '@app/auth/provider'
import {getUser} from '@app/services/User/index'
function App(): React.ReactNode {
  const [user, setUser] = React.useState<User | null>(null)
  React.useEffect(() => {
    getUser().then(u => setUser(u))
  }, [])
  const login = (form: UserData) => auth.login(form).then(u => setUser(u))
  const register = (form: UserData) => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }
  return (
    <ChakraProvider>
      {user ? (
        <AuthenticatedApp user={user} logout={logout} />
      ) : (
        <UnauthenticatedApp login={login} register={register} />
      )}
    </ChakraProvider>
  )
}

export default App
