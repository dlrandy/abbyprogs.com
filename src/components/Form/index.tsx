import * as React from 'react'

import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react'

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
    <form
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
      onSubmit={handleSubmit}
    >
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <div>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  )
}
export {FormBasic}
