import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE
} from '../constants/forecast'

const initialState = {
    forecast: {}
}

export default function forecast(state = initialState, action) {
    switch (action.type) {
        case GET_FORECAST_REQUEST:
            return { ...state, forecast: action.payload, isPending: true };
        case GET_FORECAST_SUCCESS:
            return { ...state, forecast: action.payload, isPending: false };
        case GET_FORECAST_FAILURE:
            return { ...state, forecast: action.payload, err: action.payload.err, isPending: false };
        default:
            return state
    }
}