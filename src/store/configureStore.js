import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const initState = {
  "cityList": {
    // currentCity: "",
    // currentCoord: {},
    // isPending: true,
    // list: [],
    // value: ""
  },
  "forecast": {
    // isPending: true,
    // data: {}
  }
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