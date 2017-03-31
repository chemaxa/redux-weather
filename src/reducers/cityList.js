import {
  GET_CURRENT_CITY_REQUEST,
  GET_CURRENT_CITY_SUCCESS,
  GET_CURRENT_CITY_FAILURE,
  SET_CURRENT_CITY,
  ON_INPUT,
  ADD_CITY,
  DELETE_CITY
} from '../constants/cityList'

const initialState = {
  currentCity: '',
  currentCoord: {},
  list: [],
  value: ''
}

export default function cityList(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_CITY_REQUEST:
      return { ...state, isPending: true };
    case GET_CURRENT_CITY_SUCCESS:
      return { ...state, currentCity: action.payload.address, currentCoord: action.payload.coords, list: action.payload.list.slice(), isPending: false };
    case GET_CURRENT_CITY_FAILURE:
      return { ...state, err: action.payload.err, isPending: false };
    case SET_CURRENT_CITY:
      return { ...state, currentCity: action.payload.address };
    case ADD_CITY:
      return { ...state, list: action.payload.list.slice(), value: action.payload.value };
    case DELETE_CITY:
      return { ...state, list: action.payload.list.slice() };
    case ON_INPUT:
      return { ...state, options: action.payload.options };
    default:
      return state;
  }
}