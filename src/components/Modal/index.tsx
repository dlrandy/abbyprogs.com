import * as React from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

type ModalBasicProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function ModalBasic({title, isOpen, onClose, children}: ModalBasicProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export {ModalBasic}
