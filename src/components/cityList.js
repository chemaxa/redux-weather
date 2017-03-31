import React, { Component } from 'react'
import City from './city'

export default class CityList extends Component {

  setCurrentCity(e) {
    this.props.setCurrentCity(+e.target.innerText)
  }

  render() {
    const { currentCity, list } = this.props.cityList;
    console.log(currentCity, list);
    if(!list) return null;
    return (
      <section className='city-list ui cards'>
        {list.map((number) =>
          <City key={number.toString()} value={number} />
        )}
      </section>
    )
  }
}