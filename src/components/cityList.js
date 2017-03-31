import React from 'react'
import City from './city'

const CityList = (props) => {
  const { list } = props.cityList;
  if (!list) return null;

  return (
    <section className='city-list ui cards'>
      {list.map((city) =>
        <City key={Math.random().toString(36).substring(7)} city={city} {...props} />
      )}
    </section>
  )

}
export default CityList;