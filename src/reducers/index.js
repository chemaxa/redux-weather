import { combineReducers } from 'redux'
import cityList from './cityList'
import forecast from './forecast'
import select from './select'

export default combineReducers({
  cityList,
  forecast,
  select
})