import * as React from 'react'
import 'twin.macro'
import {Button, ChakraProvider} from '@chakra-ui/react'

import {Logo} from '@app/components/Logo/index'
import {FormBasic} from '@app/components/Form'
import {ModalBasic} from '@app/components/Modal'
import {DiscoverScreen} from '@app/screens/Discover/index'
type FormDataBasic = {
  username: string
  password: string
}
type onSubmitEventHanlder = (params: FormDataBasic) => any

function Component() {
  const [openModal, setOpenModal] = React.useState('none')
  const login: onSubmitEventHanlder = formData => {
    console.log('login', formData)
  }

  const register: onSubmitEventHanlder = formData => {
    console.log('register', formData)
  }
  return (
    <div tw="flex flex-col justify-center items-center w-full h-screen">
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div tw="grid grid-cols-2 gap-3">
        <Button onClick={() => setOpenModal('login')}>Login</Button>
        <Button onClick={() => setOpenModal('register')}>Register</Button>
      </div>
      <ModalBasic
        title="Login Form"
        isOpen={openModal == 'login'}
        onClose={() => setOpenModal('none')}
      >
        <FormBasic onSubmit={login} buttonText="Login" />
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

function App() {
  return (
    <ChakraProvider>
      {/* <Component /> */}
      <DiscoverScreen />
    </ChakraProvider>
  )
}

export default App
