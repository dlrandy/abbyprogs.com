function client<T>(
  endpoint: RequestInfo,
  customConfig: RequestInit = {},
): Promise<T> {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  return window
    .fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}
