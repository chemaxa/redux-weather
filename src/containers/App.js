import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CityList from '../components/cityList'
import Forecast from '../components/forecast'
import * as cityActions from '../actions/cityList'
import * as forecastActions from '../actions/forecast'
import Select from 'react-select'

class App extends Component {

  componentWillMount() {
    this.props.cityActions.getCurrentCity();
    this.props.forecastActions.getForecast();
  }

  render() {
    return (

      <div className="ui centered stackable grid container">
        <div className="eight wide column">
          <h1 className="ui header">Choose a city</h1>
          <Select.Async
            value={this.props.cityList.value}
            onChange={this.props.cityActions.addCity}
            loadOptions={this.props.cityActions.onInput}
          />
        </div>
        <div className="four column centered row">
          <div className="column">
            <CityList actions={this.props.cityActions} cityList={this.props.cityList} />
          </div>
          <div className="column">
            <Forecast forecast={this.props.forecast} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cityActions: bindActionCreators(cityActions, dispatch),
    forecastActions: bindActionCreators(forecastActions, dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    cityList: state.cityList,
    forecast: state.forecast
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
