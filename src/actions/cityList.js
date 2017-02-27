import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_CURRENT_CITY_REQUEST,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_CURRENT_CITY
} from '../constants/cityList'

export function getCurrentCity(currentCity) {
    return (dispatch) => {
        //Send API coords request
        dispatch({
            type: GET_CURRENT_CITY_REQUEST,
            payload: currentCity
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //Get current user position 
                dispatch({
                    type: GET_CURRENT_CITY_SUCCESS,
                    payload: position.CURRENT_CITY
                })
            },
                (err) => {
                    dispatch({
                        type: GET_CURRENT_CITY_FAILURE,
                        payload: err.message
                    })
                }
            );
        } else {
            //Browser doesnt support GeoAPI
            dispatch({
                type: GET_CURRENT_CITY_FAILURE,
                payload: 'Your browser doesnt support coordinate api'
            })
        }
    }
}

export function getForecast(position) {
    return (dispatch) => {
        dispatch({
            type: GET_FORECAST_REQUEST,
            payload: position
        })
    }
}

export function setCurrentCity(currentCity) {
    return {
        type: SET_CURRENT_CITY,
        payload: currentCity
    }
}

