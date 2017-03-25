import {
    GET_CURRENT_CITY_REQUEST,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_CURRENT_CITY
} from '../constants/cityList'

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
                        debugger
                        let list = getState()['cityList']['list'] || [];

                        console.log(list, city)

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
                            address:city,
                            coords
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
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