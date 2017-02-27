import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import store from './store/configureStore'

render(
  <Provider store={store()}>
    <div className='app'>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)