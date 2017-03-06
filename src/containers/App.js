import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CityList from '../components/cityList';
import * as cityActions from '../actions/cityList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CityList cityList={this.props.cityList} actions={this.props.cityActions}/>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    cityActions: bindActionCreators(cityActions,dispatch)
  }
}
const mapStateToProps = (state)=>{
  return {
    cityList: state.cityList,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
