import {
    HANDLE_SUBMIT,
    ON_CHANGE
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

export function onChange(data) {
    console.log('Changed data:', data);
    data = 'new';
    let url = `http://autocompletecity.geobytes.com/AutoCompleteCity?callback=?&q=${data}`;

    fetch(url,{mode: 'cors'})
        .then((res) => {
            return res.json();
        })
        .then((list) => {
            console.log('cityList: ', list);
        })

    return {
        type: ON_CHANGE,
        payload: {
            data
        }
    }
}