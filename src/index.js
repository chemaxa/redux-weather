import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import storageApi from './api/storage'
import { KEY } from './constants/api'
import throttle from 'lodash.throttle'

import 'semantic-ui-css/semantic.min.css' // semantic ui css
import 'react-select/dist/react-select.css' // react select css
import './styles.css' // app styles

const persistedState = storageApi.getState(KEY);
const store = configureStore(persistedState);

store.subscribe(throttle(() => {
  storageApi.setState(KEY, store.getState())
}, 1000))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)