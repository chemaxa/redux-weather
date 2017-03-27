import { combineReducers } from 'redux'
import cityList from './cityList'
import forecast from './forecast'
import { reducer as form } from 'redux-form'

export default combineReducers({
  cityList,
  forecast,
  form
})