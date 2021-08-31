import * as React from 'react'
import 'twin.macro'
import {Button} from '@chakra-ui/react'
import '@app/server/index'
import {Logo} from '@app/components/Logo/index'
import {FormBasic} from '@app/components/Form'
import {ModalBasic} from '@app/components/Modal'

type FormDataBasic = {
  username: string
  password: string
}
type onSubmitEventHanlder = (params: FormDataBasic) => any
const defaultLogin: onSubmitEventHanlder = formData => {
  console.log('login', formData)
}

const defaultRegister: onSubmitEventHanlder = formData => {
  console.log('register', formData)
}
type UnauthenticatedAppProps = {
  login: onSubmitEventHanlder
  register: onSubmitEventHanlder
}
function UnauthenticatedApp({
  login = defaultLogin,
  register = defaultRegister,
}: UnauthenticatedAppProps): JSX.Element {
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <div tw="flex flex-col justify-center items-center w-full h-screen">
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div tw="grid grid-cols-2 gap-3">
        <Button colorScheme="blue" onClick={() => setOpenModal('login')}>
          Login
        </Button>
        <Button onClick={() => setOpenModal('register')}>Register</Button>
      </div>
      <ModalBasic
        title="Login Form"
        isOpen={openModal == 'login'}
        onClose={() => setOpenModal('none')}
      >
        <FormBasic onSubmit={login} buttonText="Login" colorScheme={'blue'} />
      </ModalBasic>

      <ModalBasic
        title="Register Form"
        isOpen={openModal == 'register'}
        onClose={() => setOpenModal('none')}
      >
        <FormBasic onSubmit={register} buttonText="Register" />
      </ModalBasic>
    </div>
  )
}

export {UnauthenticatedApp}
