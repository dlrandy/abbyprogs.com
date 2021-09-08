import * as auth from '@app/auth/provider'
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

function client<T, R>(
  endpoint: RequestInfo,
  {
    data,
    token,
    headers: customHeaders,
    ...customConfig
  }: {token?: string; data?: T} & RequestInit = {},
): Promise<R> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      'Content-Type': data ? 'application/json' : null,
      ...customHeaders,
    } as HeadersInit,
    ...customConfig,
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.assign(window.location.toString())
      return Promise.reject({message: 'please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
