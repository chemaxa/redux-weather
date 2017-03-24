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
}

function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            return getPositionByIp();
        }
    });
}

function resolvePosition(position) {
    //Get current user position 
    return {
        lat: position.coords.latitude,
        long: position.coords.longitude
    };
};

function getCityByCoords(){
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.long}&language=en-GB`;

}

export function getCurrentCity() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_CURRENT_CITY_REQUEST,
            payload: {}
        })
        return getPosition(dispatch, getState)
            .then(
                resolvePosition,
                getPositionByIp
            )
            .then((data) => {
                debugger
                
                let coords = {
                    lat: data['lat'] || data.loc.split(',')[0],
                    long: data['long'] || data.loc.split(',')[1]
                };
                

                let list = getState()['cityList']['list'] || [];

                console.log(list, data)

                //Getting coords by IP
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