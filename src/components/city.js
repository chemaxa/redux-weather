import React from 'react'

const City = (props) => {
    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{props.value.split(',')[0]}</div>
                <div className="description">
                    <p>{props.value}</p>
                </div>

            </div>
            <div className="ui two bottom attached buttons">
                <div className="ui bottom mini primary basic button">
                    <i className="delete icon"></i>
                    Set
            </div>
                <div className="ui bottom mini negative basic button">
                    <i className="delete icon"></i>
                    Delete
            </div>
            </div>
        </div>
    )
}
export default City;