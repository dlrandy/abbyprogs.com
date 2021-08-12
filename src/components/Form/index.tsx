import * as React from 'react'

import {Button} from '@chakra-ui/react'

type LoginFormElementData = {
  username: {value: string}
  password: {value: string}
}
type LoginFormData = {
  username: string
  password: string
}
type onSubmitEventHanlder = (params: LoginFormData) => any
type LoginFormProps = {
  onSubmit: onSubmitEventHanlder
  buttonText: string
  children?: React.ReactNode
}
function FormBasic({onSubmit, buttonText}: LoginFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const {username, password} = event.target as typeof event.target &
      LoginFormElementData

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  )
}
export {FormBasic}
