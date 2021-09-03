import * as React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {FormControl, FormLabel, Input} from '@chakra-ui/react'
import {useAsync} from '@app/utils/hooks'
import {Spinner, ErrorMessage} from '@app/components/lib/index'
type LoginFormElementData = {
  username: {value: string}
  password: {value: string}
}

type onSubmitEventHanlder = (params: UserData) => Promise<unknown>
type LoginFormProps = {
  onSubmit: onSubmitEventHanlder
  submitButton: JSX.Element
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
function FormBasic({onSubmit, submitButton}: LoginFormProps): JSX.Element {
  const {isLoading, isError, error, run} = useAsync()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const {username, password} = event.target as typeof event.target &
      LoginFormElementData

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
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
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </Form>
  )
}
export {FormBasic}
