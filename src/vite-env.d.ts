/// <reference types="vite/client" />
import 'twin.macro'
import {css as cssImport} from '@emotion/react'
import {CSSInterpolation} from '@emotion/serialize'
import styledImport from '@emotion/styled'

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation
  }
}
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {title?: string}
  >
}
