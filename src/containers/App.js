import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CityList from '../components/cityList';
import Forecast from '../components/forecast';
import * as cityActions from '../actions/cityList';
import * as forecastActions from '../actions/forecast';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CityList cityList={this.props.cityList} actions={this.props.cityActions}/>
        <Forecast actions={this.props.forecastActions} forecast={this.props.forecast}/>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    cityActions: bindActionCreators(cityActions,dispatch),
    forecastActions: bindActionCreators(forecastActions,dispatch)
  }
}
const mapStateToProps = (state)=>{
  return {
    cityList: state.cityList,
    forecast: state.forecast
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
