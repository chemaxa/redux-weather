import {
    GET_CURRENT_CITY_REQUEST,
    GET_CURRENT_CITY_SUCCESS,
    GET_CURRENT_CITY_FAILURE,
    SET_CURRENT_CITY
} from '../constants/cityList'

function getPositionByIp() {
    return fetch('http://ipinfo.io/json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (!~getState()['cityList']['list'].indexOf(data['city']))
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

function getPostion() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                resolve(position),
                reject(err)
            );
        } else {
            return getPositionByIp();
        }
    });
    function resolve(position) {
        //Get current user position 
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&language=en-GB`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                if (!~getState()['cityList']['list'].indexOf(data['results'][0]["formatted_address"]))
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
    };
    function reject() {
        return getPositionByIp();
    };

}

export function getCurrentCity() {
    return (dispatch, getState) => {

        //Send API coords request
        dispatch({
            type: GET_CURRENT_CITY_REQUEST,
            payload: {}
        })

        return getPosition(dispatch,getState);

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

