import {
    GET_CURRENT_CITY_REQUEST,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_CURRENT_CITY
} from '../constants/cityList'

function getPositionByIp(dispatch, getState) {
    return fetch('http://ipinfo.io/json')
        .then((response) => {
            return response.json();
        })
}

function getPosition(dispatch, getState) {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            return getPositionByIp(dispatch, getState);
        }
    });
}

function resolvePosition(dispatch, getState, position) {
    //Get current user position 
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=en-GB`;

    return fetch(url)
        .then((response) => {
            return response.json();
        })
};

//Getting coords by GeoAPI
// if (!~getState()['cityList']['list'].indexOf(data['results'][0]["formatted_address"])) {
//     getState()['cityList']['list'].push(data['results'][0]["formatted_address"]);
// }

//Getting coords by IP
// if (!~getState()['cityList']['list'].indexOf(data['city'])) {
//     getState()['cityList']['list'].push(data['city']);
// }

export function getCurrentCity() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_CURRENT_CITY_REQUEST,
            payload: {}
        })
        return getPosition(dispatch, getState)
            .then(
                resolvePosition.bind(null, dispatch, getState),
                getPositionByIp.bind(null, dispatch, getState)
            )
            .then((data) => {
                let coords = data['coords'] || {
                    lat: data.loc.split(',')[0],
                    long: data.loc.split(',')[1]
                };

                let list = getState()['cityList']['list'] || [];
                //Getting coords by IP
                console.log(list, data)
                if (data['city'] && !~list.indexOf(data['city'])) {
                    list.push(data['city']);
                }
                //Getting coords by GeoAPI
                if (data['results'] && !~list.indexOf(data['results'][0]["formatted_address"])) {
                    list.push(data['results'][0]["formatted_address"]);
                }
                let payload = {
                    address: data['city'] || data['results'][0]["formatted_address"],
                    coords,
                    list
                };
                dispatch({
                    type: GET_CURRENT_CITY_SUCCESS,
                    payload
                });
                return coords;
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