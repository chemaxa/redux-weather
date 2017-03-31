import React from 'react'

const Forecast = (props) => {
    if(!props.forecast.data)return null;
    let text = 'Please, waiting...';
    let icon_url = '';
    if (props.forecast.isPending === false) {
        text = props.forecast.data.forecastday[0].fcttext_metric;
        icon_url = props.forecast.data.forecastday[0].icon_url;
    }

    return (
        <section className='forecast'>
            <div className="ui card">
                <div className="content">
                    <div className="header">Forecast</div>
                    <div className="description">
                        <p>{text}</p>
                        <img src={icon_url} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )

}
export default Forecast;