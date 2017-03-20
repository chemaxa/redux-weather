import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE
} from '../constants/forecast'

import { getCurrentCity } from './cityList'

export function getForecast(data) {
    return (dispatch, getState) => {

        if (!data) {
            dispatch(getCurrentCity()).then(forecastByCoord)
        } else {
            forecastByCoord(data);
        }
        
        function forecastByCoord(data) {
            console.log('City: ', data)
            dispatch({
                type: GET_FORECAST_REQUEST,
                payload: data
            })

            let long = data.coords.longitude;
            let lat = data.coords.latitude;
            let url = `http://api.wunderground.com/api/80a9caf2dd83fba3/forecast/geolookup/lang:RU/q/${lat},${long}.json`;

            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    dispatch({
                        type: GET_FORECAST_SUCCESS,
                        payload: data.forecast.txt_forecast
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
}