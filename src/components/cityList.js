import React, { Component } from 'react'

export default class CityList extends Component {
  
  setCurrentCity(e) {
    this.props.setCurrentCity(+e.target.innerText)
  }

  componentWillMount(){
    this.props.actions.getCurrentCity();
  }
  
  render() {
    console.log('CityList: ',this.props)
    const {currentCity} = this.props.cityList;
    return (
        <section className='city-list'>
            {currentCity}
        </section>
    )
  }
}