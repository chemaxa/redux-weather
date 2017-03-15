import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE
} from '../constants/forecast'

import { getCurrentCity } from './cityList'

export function getForecast(data) {
    return (dispatch, getState) => {

        if (!data) {
            console.log(dispatch(getCurrentCity));
            return dispatch(getCurrentCity()).then(() => {console.log('City')})
            //return dispatch(getCurrentCity()).then((city) => { console.assert(city) })
        }

        dispatch({
            type: GET_FORECAST_REQUEST,
            payload: data
        })

        let long = 30.2642; //data.coords.long
        let lat = 59.8944; //data.coords.lat
        let url = `http://api.wunderground.com/api/80a9caf2dd83fba3/forecast/geolookup/lang:RU/q/${lat},${long}.json`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                dispatch({
                    type: GET_FORECAST_SUCCESS,
                    payload: data
                })
            })
            .catch((err) => {
                dispatch({
                    type: GET_FORECAST_FAILURE,
                    payload: {
                        err: err.message
                    }
                })
            });
    }
}