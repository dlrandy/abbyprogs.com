import * as React from 'react'
import {getUser} from '@app/services/User/index'
import * as auth from '@app/auth/provider'
import {useAsync} from '@app/utils/hooks'
import {client} from '@app/utils/api-client'
import {queryClient} from '@app/models/QueryClient/index'
import {FullPageSpinner, FullPageErrorFallback} from '@app/components/lib/index'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = React.createContext<AuthInterface>(null!)
AuthContext.displayName = 'AuthContext'
interface AuthInterface {
  user: User
  login: (form: UserData) => Promise<void>
  register: (form: UserData) => Promise<void>
  logout: () => void
}
function AuthProvider(props: {children: React.ReactNode}): EmotionJSX.Element {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync<User | null, Error>()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = (form: UserData) => auth.login(form).then(u => setData(u))
  const register = (form: UserData) => auth.register(form).then(u => setData(u))
  const logout = () => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }
  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const value = {user, login, register, logout} as unknown as AuthInterface
    return <AuthContext.Provider value={value} {...props} />
  }
  throw new Error(`Unhandled status: ${status}`)
}

function useAuth(): AuthInterface {
  const context = React.useContext<AuthInterface>(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext Provider.`)
  }
  return context
}

function useClient<T>(): (endpoint: any, config: any) => Promise<T> {
  const {
    user: {token},
  } = useAuth()

  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
