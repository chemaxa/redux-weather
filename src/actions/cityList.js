import {
    GET_CURRENT_CITY_REQUEST,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_CURRENT_CITY,
    ON_INPUT,
    ADD_CITY,
    DELETE_CITY
} from '../constants/cityList'

import fetchJsonp from 'fetch-jsonp'

export function addCity(data) {
    return (dispatch, getState) => {
        let list = getState()['cityList']['list'] || [];
        if (!data) {
            return dispatch({
                type: ADD_CITY,
                payload: {
                    list,
                    value: ''
                }
            })
        }
        list.push(data.value);
        dispatch({
            type: ADD_CITY,
            payload: {
                list,
                value: data ? data.value : ''
            }
        })
    }
}

export function deleteCity(data) {
    console.log('Submitted data:', data);
    if (!data) return;
    return (dispatch, getState) => {
        let list = getState()['cityList']['list'] || [];
        let id = list.indexOf(data.value);
        if (id !== -1) {
            list.splice(id, 1);
            dispatch({
                type: DELETE_CITY,
                payload: {
                    list
                }
            })
        }

    }
}

export function getCurrentCity() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_CURRENT_CITY_REQUEST,
            payload: {}
        })
        return getCoords()
            .then(
            resolveCoords,
            getCoordsByIp
            )
            .then((coords) => {
                return getCityByCoords(coords)
                    .then((city) => {
                        let list = getState()['cityList']['list'] || [];
                        if (list.indexOf(city)) {
                            list.push(city);
                        }
                        dispatch({
                            type: GET_CURRENT_CITY_SUCCESS,
                            payload: {
                                address: city,
                                coords,
                                list
                            }
                        });
                        return {
                            address: city,
                            coords
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

function getCoordsByIp() {
    return fetch('http://ipinfo.io/json')
        .then(response => response.json())
        .then((data) => {
            return {
                lat: data.loc.split(',')[0],
                long: data.loc.split(',')[1]
            };
        })
}

function getCoords() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            return getCoordsByIp();
        }
    });
}

function resolveCoords(position) {
    return {
        lat: position.coords.latitude,
        long: position.coords.longitude
    };
};

function getCityByCoords({
    lat,
    long
}) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=en-GB`;
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(data => data['results'][0]["formatted_address"])
}
