import * as React from 'react'
import {withMessage} from '@app/__tests__/utils/index'
import ReactDOM from 'react-dom'
import {screen, prettyDOM, act} from '@testing-library/react'

test('should render the app', () => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
  act(() => {
    require('../../../main.tsx')
    // console.log(screen.debug())
    screen.getByTitle('Bookshelf')
    screen.getByRole('heading', {name: /Bookshelf/i})
    screen.getByRole('button', {name: /Login/i})
    screen.getByRole('button', {name: /Register/i})
    const cssEl: Element | undefined = document.body.querySelector(
      '[css]',
    ) as any
    withMessage(() => expect(cssEl).toBeNull(), `${prettyDOM(cssEl)}`.trim())

    withMessage(
      () => expect(document.body.querySelector('[class*=css-]')).not.toBeNull(),
      `None of the elements are styled by emotion. Make sure to render a styled component and use the css prop.`,
    )

    // cleanup
    ReactDOM.unmountComponentAtNode(root)
    document.body.removeChild(root)
  })
})
