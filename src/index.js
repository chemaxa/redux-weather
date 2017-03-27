import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import storageApi from './api/storage'
import { KEY } from './constants/api'

import 'semantic-ui-css/semantic.min.css';

const persistedState = storageApi.getState(KEY);
const store = configureStore(persistedState);

store.subscribe(() => {
  console.log('Subscribe: ',store.getState());
  storageApi.setState(KEY,store.getState())
})

render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
)