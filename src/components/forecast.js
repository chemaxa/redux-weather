import React, { Component } from 'react'

export default class Forecast extends Component {

    getForecast(e) {
        //this.props.getForecast(+e.target.innerText)
    }

    componentWillMount() {
         this.props.actions.getForecast();
    }

    render() {
        return (
            <section className='forecast'>
                Forecast
        </section>
        )
    }
}