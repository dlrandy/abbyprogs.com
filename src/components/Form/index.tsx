import * as React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react'

type LoginFormElementData = {
  username: {value: string}
  password: {value: string}
}

type onSubmitEventHanlder = (params: UserData) => any
type LoginFormProps = {
  onSubmit: onSubmitEventHanlder
  buttonText: string
  colorScheme:
    | 'whiteAlpha'
    | 'blackAlpha'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink'
    | 'linkedin'
    | 'facebook'
    | 'messenger'
    | 'whatsapp'
    | 'twitter'
    | 'telegram'
  children?: React.ReactNode
}

const Form = styled.form(() => [
  tw`flex flex-col items-stretch`,
  css`
    & > div {
      margin: 10px auto;
      width: 100%;
      max-width: 300px;
    }
  `,
])
function FormBasic({onSubmit, buttonText, colorScheme}: LoginFormProps) {
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
    <Form
      // css={{
      //   '> div': {
      //     margin: '10px auto',
      //     width: '100%',
      //     maxWidth: '300px',
      //   },
      // }}
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
        <Button colorScheme={colorScheme} type="submit">
          {buttonText}
        </Button>
      </div>
    </Form>
  )
}
export {FormBasic}
