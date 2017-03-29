import {
    HANDLE_SUBMIT
} from '../constants/form'

export function handleSubmit(data) {
    console.log('Submitted data:', data);
    return {
        type: HANDLE_SUBMIT,
        payload: {
            data
        }
    }
}