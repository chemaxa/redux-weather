import React from 'react'

const City = (props) => {
    let { city, actions, cityList: { currentCity } } = props;

    return (
        <div className="ui card">
            <div className="content">
                <div className={"ui header " + (city === currentCity ? 'blue' : '')}>{city.split(',')[0]}</div>
                <div className="description">
                    <p>{city}</p>
                </div>

            </div>
            <div className="ui two bottom attached buttons">
                <button className={"ui bottom mini primary button " + (city === currentCity ? 'active disabled' : '')} onClick={actions.setCurrentCity.bind(null, city)}>
                    <i className="checkmark icon"></i>
                    Set
                </button>
                <button className="ui bottom mini negative button">
                    <i className="delete icon"></i>
                    Delete
                </button>
            </div>
        </div>
    )
}
export default City;