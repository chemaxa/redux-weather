import React, { PropTypes, Component } from 'react'

export default class Page extends Component {
  
  setCurrentCity(e) {
    this.props.setCurrentCity(e.target.innerText)
  }

  componentWillMount(){
    this.props.getCurrentCity();
  }
  
  render() {
      const {currentCity} = this.props.currentCity;
    return (
        <div className='city-list'>
            {currentCity}
        </div>
    )
  }
}