import React, { PropTypes, Component } from 'react'

export default class CityList extends Component {
  
  setCurrentCity(e) {
    this.props.setCurrentCity(+e.target.innerText)
  }

  componentWillMount(){
    console.log(this.props)
    this.props.actions.getCurrentCity();
  }
  
  render() {
    const {currentCity} = this.props.cityList;
    return (
        <div className='city-list'>
            {currentCity}
        </div>
    )
  }
}