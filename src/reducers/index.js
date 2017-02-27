import { combineReducers } from 'redux'
import cityList from './cityList'
import forecast from './forecast'

export default combineReducers({
  cityList,
  forecast
})