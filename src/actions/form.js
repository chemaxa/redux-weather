import {
    HANDLE_SUBMIT,
    ON_CHANGE
} from '../constants/form'
import fetchJsonp from 'fetch-jsonp'

export function handleSubmit(data) {
    console.log('Submitted data:', data);
    return {
        type: HANDLE_SUBMIT,
        payload: {
            data
        }
    }
}

export function onChange({cityName}) {
    if(!cityName)return;
    console.log('Changed data:', cityName);
    let url = `http://autocompletecity.geobytes.com/AutoCompleteCity?q=${cityName}`;

    fetchJsonp(url)
        .then((res) => {
            return res.json();
        })
        .then((list) => {
            console.log('cityList: ', list);
        })

    return {
        type: ON_CHANGE,
        payload: {
            cityName
        }
    }
}