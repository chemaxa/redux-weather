import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const initState = {
  "cityList": {},
  "forecast": {},
  "select":{}
};
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
export default function configureStore(initialState = initState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk)
    )   
  )
}