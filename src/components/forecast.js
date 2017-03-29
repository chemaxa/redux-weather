import React, { Component } from 'react'

export default class Forecast extends Component {
    render() {
        let text = 'Please, waiting...';

        if(this.props.forecast.isPending === false){
            text = this.props.forecast.data.forecastday[0].fcttext_metric;
        }
        
        return (
            <section className='forecast'>
                <div className="ui card">
                    <div className="content">
                        <div className="header">Forecast</div>
                        <div className="description">
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}