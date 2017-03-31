import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE,
    RESET_FORECAST
} from '../constants/forecast'

const initialState = {
    isPending: false
};

export default function forecast(state = initialState, action) {
    switch (action.type) {
        case GET_FORECAST_REQUEST:
            return { ...state, data: action.payload, isPending: true };
        case GET_FORECAST_SUCCESS:
            return { ...state, data: action.payload, isPending: false };
        case GET_FORECAST_FAILURE:
            return { ...state, data: action.payload, err: action.payload.err, isPending: false };
        case RESET_FORECAST:
            return { ...state, data: action.payload };
        default:
            return state
    }
}