import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE
} from '../constants/forecast'

import { getCurrentCity } from './cityList'

export function getForecast(coords) {
    return (dispatch, getState) => {

        if (!coords) {
            dispatch(getCurrentCity()).then(forecastByCoord)
        } else {
            forecastByCoord(coords);
        }

        function forecastByCoord(coords) {
            console.log('City: ', coords)

            dispatch({
                type: GET_FORECAST_REQUEST,
                payload: coords
            })

            let long = coords.longitude;
            let lat = coords.latitude;
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
}