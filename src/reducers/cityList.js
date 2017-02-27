import { SET_CURRENT_CITY, ADD_CITY, DELETE_CITY } from '../constants/cityList'

const initialState = {
  currentCity: 'London',
  list: ['London']
}

export default function cityList(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_CITY: 
      return {...state, currentCity: action.payload};
    case ADD_CITY:
      return {...state, list: action.payload};
    case DELETE_CITY:
      return {...state, list: action.payload};
    default:
      return state;
  }
}