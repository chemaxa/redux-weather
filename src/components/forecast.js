import React, { Component } from 'react'

export default class Forecast extends Component {

    getForecast(e) {
        //this.props.getForecast(+e.target.innerText)
    }

    componentWillMount() {
         this.props.actions.getForecast();
    }

    render() {
        console.log('Forecast: ',this.props)
        
        let text = 'Please, waiting...';

        if(this.props.forecast.isPending === false){
            text = this.props.forecast.data.forecastday[0].fcttext;
        }
        
        return (
            <section className='forecast'>
                {text}
            </section>
        )
    }
}