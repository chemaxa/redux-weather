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
                <button className="ui bottom mini primary button">
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