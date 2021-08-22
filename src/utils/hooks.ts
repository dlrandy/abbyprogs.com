import * as React from 'react'

function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (args: T) => {
      mounted.current ? dispatch(args) : void 0
    },
    [dispatch],
  )
}

const defaultInitialState = {status: 'idle', data: null, error: null}
type asyncResType<T, R> = {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  setData: (d: T) => void
  setError: (e: R) => void
  error: Error
  status: string
  data: T
  run: (p: Promise<T>) => void
  reset: () => void
}
function useAsync<T, R>(
  initialState?: Record<string, unknown>,
): asyncResType<T, R> {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer(
    (s: Record<string, unknown>, a: Record<string, unknown>) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    data => safeSetState({data, status: 'resolved'}),
    [safeSetState],
  )
  const setError = React.useCallback(
    error => safeSetState({error, status: 'rejected'}),
    [safeSetState],
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  const run = React.useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning unknownthing?`,
        )
      }
      safeSetState({status: 'pending'})
      return promise.then(
        (data: T) => {
          setData(data)
          return data
        },
        (error: R) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export {useAsync}
