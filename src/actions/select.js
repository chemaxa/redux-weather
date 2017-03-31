import {
    ON_CHANGE,
    ON_INPUT
} from '../constants/select'
import fetchJsonp from 'fetch-jsonp'

export function onChange(data) {
    console.log('Submitted data:', data);
    return {
        type: ON_CHANGE,
        payload: {
            value: data ? data.value : ''
        }
    }
}

export function onInput(input, callback) {
    return (dispatch) => {
        console.log('Changed data:', input);
        if (!input) { callback(); return; }
        let url = `http://autocompletecity.geobytes.com/AutoCompleteCity?q=${input}`;
        fetchJsonp(url)
            .then((res) => {
                return res.json();
            })
            .then((list) => {
                console.log('cityList: ', list);
                let options = list.map(
                    (city) => ({
                        value: city,
                        label: city
                    })
                );
                callback(null, {
                    options
                })
                dispatch({
                    type: ON_INPUT,
                    payload: {
                        options
                    }
                })
            })
    }
}