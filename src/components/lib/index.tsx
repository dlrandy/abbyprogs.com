import * as React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'
import * as colors from '@app/styles/colors'
import * as mq from '@app/styles/media-queries'
import {ModalBasic as CustomDialog} from '@app/components/Modal/index'
import {FaSpinner} from 'react-icons/fa'
import {createStyles} from '@app/types/emotion-styles'
import {EmotionJSX} from '@emotion/react/types/jsx-namespace'
import tw, {css} from 'twin.macro'
const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const BookListUL = styled.ul({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const buttonVariants = createStyles({
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
})

type BtnVarName = keyof typeof buttonVariants

interface StyledBtnProps {
  variant: BtnVarName
}
const Button = styled.button<StyledBtnProps>(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
}

const Input = styled.input({borderRadius: '3px'}, inputStyles)
const Textarea = styled.textarea(inputStyles)

const Dialog = styled(CustomDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

function FullPageSpinner(): EmotionJSX.Element {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

const Link = styled(RouterLink)({
  color: colors.indigo,
  ':hover': {
    color: colors.indigoDarken10,
    textDecoration: 'underline',
  },
})

const errorMessageVariants: {
  stacked: {display: string}
  inline: {display: string}
} = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}
type ErrorMessageProps = {
  error: Error
  variant?: 'stacked' | 'inline'
}
function ErrorMessage({
  error,
  variant = 'stacked',
  ...props
}: ErrorMessageProps): EmotionJSX.Element {
  return (
    <div
      role="alert"
      css={[{color: colors.danger}, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          {whiteSpace: 'break-spaces', margin: '0', marginBottom: -5},
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({error}: ErrorMessageProps): EmotionJSX.Element {
  return (
    <div
      role="alert"
      css={[
        tw`h-screen flex flex-col justify-center items-center`,
        css`
          color: ${colors.danger};
        `,
      ]}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export {
  FullPageErrorFallback,
  ErrorMessage,
  CircleButton,
  BookListUL,
  Spinner,
  Button,
  Input,
  Textarea,
  Dialog,
  FormGroup,
  FullPageSpinner,
  Link,
}
