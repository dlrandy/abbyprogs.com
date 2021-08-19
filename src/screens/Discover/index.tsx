import * as React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled'
/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import {Button, FormControl, FormLabel, Input} from '@chakra-ui/react'

function DiscoverScreen() {
  return (
    <div css={[tw`max-w-800 m-auto w-screen-90 p-p32px py-0`]}>
      <Form>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Search books..."
            id="search"
            css={{width: '100%'}}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <div>
          <Button type="submit">{buttonText}</Button>
        </div>
      </Form>
    </div>
  )
}
export {DiscoverScreen}
