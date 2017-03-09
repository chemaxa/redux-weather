import {
  GET_FORECAST_REQUEST,
  GET_FORECAST_SUCCESS,
  GET_CURRENT_CITY_REQUEST,
  GET_CURRENT_CITY_SUCCESS,
  GET_CURRENT_CITY_FAILURE,
  SET_CURRENT_CITY,
  ADD_CITY,
  DELETE_CITY
} from '../constants/cityList'

const initialState = {
  currentCity: 'London',
  list: ['London']
}

export default function cityList(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_CITY_REQUEST:
      return { ...state, currentCity: action.payload, isPending: true };
    case GET_CURRENT_CITY_SUCCESS:
      return { ...state, currentCity: action.payload, isPending: false };
    case GET_CURRENT_CITY_FAILURE:
      return { ...state, currentCity: action.payload, isPending: false };
    case GET_FORECAST_REQUEST:
      return { ...state, forecast: action.payload, isPending: true };
    case GET_FORECAST_SUCCESS:
      return { ...state, forecast: action.payload, isPending: false };
    case SET_CURRENT_CITY:
      return { ...state, currentCity: action.payload };
    case ADD_CITY:
      return { ...state, list: action.payload };
    case DELETE_CITY:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}