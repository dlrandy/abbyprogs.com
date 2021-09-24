/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'virtual:windi.css'
import '@app/server/index'
import {AppProviders} from '@app/context/index'
import App from './App'
ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)
