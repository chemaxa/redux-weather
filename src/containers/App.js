import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CityList from '../components/cityList';
import Forecast from '../components/forecast';
import * as cityActions from '../actions/cityList';
import * as forecastActions from '../actions/forecast';

class App extends Component {
  
  componentWillMount() {
        this.props.forecastActions.getForecast();
        this.props.cityActions.getCurrentCity();
  }
  
  render() {
    return (
        <div className="ui centered stackable grid container">
          <div className="four wide column">
            <form className="ui form">
              <div className="fields">
                <div className="field">
                  <label>City:</label>
                  <input type="text" name="city" placeholder="City"/>
                </div>
               </div>
               <button className="ui button" type="submit">Submit</button>
            </form>
          </div>
          <div className="four column centered row">
            <div className="column">
              <CityList actions={this.props.cityActions} cityList={this.props.cityList}/>
            </div>
            <div className="column">
              <Forecast forecast={this.props.forecast}/>
            </div>
          </div>
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
