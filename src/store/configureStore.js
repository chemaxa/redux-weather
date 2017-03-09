import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const initState = {
  "cityList": {},
  "forecast": {}
};

export default function configureStore(initialState = initState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  )
}