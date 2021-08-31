const localStorageKey = '__auth_provider_token__'
async function getToken(): Promise<string | null> {
  // make a request to  get user token
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({user}: {user: User}) {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}
type LogOrRegUser = {
  username: string
  password: string
}
function login({username, password}: LogOrRegUser): Promise<User> {
  return client('login', {username, password}).then(handleUserResponse)
}

function register({username, password}: LogOrRegUser): Promise<User> {
  return client('register', {username, password}).then(handleUserResponse)
}

async function logout(): Promise<void> {
  window.localStorage.removeItem(localStorageKey)
}

const authURL = import.meta.env.VITE_REACT_APP_AUTH_URL

async function client<T>(endpoint: RequestInfo, data: LogOrRegUser) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getToken, login, register, logout, localStorageKey}
