import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CityList from '../components/cityList'
import Forecast from '../components/forecast'
import * as cityActions from '../actions/cityList'
import * as forecastActions from '../actions/forecast'
import * as selectActions from '../actions/select'
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
            value={this.props.select.value}
            onChange={(data) => { console.log(data); this.props.selectActions.onChange(data) }}
            loadOptions={(input, callback) => { this.props.selectActions.onInput(input, callback) }}
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
    forecastActions: bindActionCreators(forecastActions, dispatch),
    selectActions: bindActionCreators(selectActions, dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    cityList: state.cityList,
    forecast: state.forecast,
    select: state.select
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
