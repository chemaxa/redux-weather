import {
    ON_INPUT,
    ON_CHANGE
} from '../constants/select'

const initialState = {};

export default function select(state = initialState, action) {
    switch (action.type) {
        case ON_INPUT:
            return { ...state, options: action.payload.options };
        case ON_CHANGE:
            return { ...state, options: action.payload.options, value: action.payload.value };
        default:
            return state
    }
}