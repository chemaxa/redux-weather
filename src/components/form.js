import React from 'react'
import { Field, reduxForm } from 'redux-form'

const CityForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div className="field">
        <label>City Name</label>
        <div>
          <Field name="cityName" component="input" type="text" placeholder="City Name"/>
        </div>
      </div>
      <button type="submit"  className="ui button primary" disabled={pristine || submitting}>Submit</button>
      <button type="button"  className="ui button secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
    </form>
  )
}

export default reduxForm({
  form: 'city'  // a unique identifier for this form,
})(CityForm)
