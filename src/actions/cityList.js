import {
    GET_FORECAST_REQUEST,
    GET_FORECAST_SUCCESS,
    GET_FORECAST_FAILURE,
    GET_CURRENT_CITY_REQUEST,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_CURRENT_CITY
} from '../constants/cityList'

function getPositionByIp(dispatch,getState) {
    fetch('http://ipinfo.io/json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(!~getState()['cityList']['list'].indexOf(data['city']))
                getState()['cityList']['list'].push(data['city']);

            dispatch({
                type: GET_CURRENT_CITY_SUCCESS,
                payload: {
                    address: data['city'],
                    coords: {
                        lat: data.loc.split(',')[0],
                        long: data.loc.split(',')[1]
                    },
                    list: getState()['cityList']['list']
                }
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_CURRENT_CITY_FAILURE,
                payload: {
                    err: err.message
                }
            })
        });
}

export function getCurrentCity() {
    return (dispatch, getState) => {

        //Send API coords request
        dispatch({
            type: GET_CURRENT_CITY_REQUEST,
            payload: {}
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //Get current user position 
                let long = position.coords.longitude;
                let lat = position.coords.latitude;
                let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=en-GB`;
                
                fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {

                        if(!~getState()['cityList']['list'].indexOf(data['results'][0]["formatted_address"]))
                            getState()['cityList']['list'].push(data['results'][0]["formatted_address"]);

                        dispatch({
                            type: GET_CURRENT_CITY_SUCCESS,
                            payload: {
                                address: data['results'][0]["formatted_address"],
                                coords: position.coords,
                                list: getState()['cityList']['list']
                            }
                        })
                    })
                    .catch((err) => {
                        dispatch({
                            type: GET_CURRENT_CITY_FAILURE,
                            payload: {
                                err: err.message
                            }
                        })
                    });
            },
                () => {
                    getPositionByIp(dispatch);
                }
            );
        } else {
            getPositionByIp(dispatch);
        }
    }
}

export function getForecast(data) {
    return (dispatch) => {
        dispatch({
            type: GET_FORECAST_REQUEST,
            payload: data.address
        })
        let long = 30.2642; //data.coords.long
        let lat = 59.8944; //data.coords.lat
        let url = `http://api.wunderground.com/api/80a9caf2dd83fba3/forecast/geolookup/lang:RU/q/${lat},${long}.json`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
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

export function setCurrentCity(data) {
    return {
        type: SET_CURRENT_CITY,
        payload: {
            address: data.address,
            coords: data.coords
        }
    }
}

