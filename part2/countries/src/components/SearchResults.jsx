const MAX_COUNTRIES = 10

const CountryWeather = ({ country, weather }) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid darkgray',
    borderRadius: '12%',
    margin: '24px'
  }
  const descContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgb(190, 235, 235)',
    borderRadius: '12px',
    margin: '8px',
    padding: '0 12px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
  const imgStyle = {
    maxHeight: '64px'
  }

  return weather && (
    <section style={ style }>
      <h4>Weather in { country.capital[0] }</h4>
      <p>Temperature: { weather.main.temp }&deg;F</p>
      <div style={ descContainerStyle }>
        <p>{ weather.weather[0].description }</p>
        <img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` } style={ imgStyle } />
      </div>
    </section>
  )
}

const CountryData = ({ country, weather }) => {
  const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '12px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '32px'
  }
  const flagStyle = {
    height: '72px',
    border: '1px solid'
  }
  return (
    <section>
      <div style={ headerStyle }>
        <h3>{ country.name.common }</h3>
        <img src={ country.flags.png } style={ flagStyle } />
      </div>
      <p>Capital: { country.capital[0] }</p>
      <p>Area: { country.area.toLocaleString() } sq km</p>
      <section>
        <h4>Languages</h4>
        <ul>
          { Object.entries(country.languages).map(([code, lang]) => (
            <li key={ code }>{ lang }</li>
          )) }
        </ul>
      </section>
      <CountryWeather country={ country } weather={ weather } />
    </section>
  )
}

const SearchResult = ({ country, onClick }) => {
  const style = {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    margin: '8px',
    alignItems: 'center'
  }
  return (
    <div style={style}>
      { country.name.common }
      <button onClick={ onClick }>show</button>
    </div>
  )
}

const SearchResults = ({ data, setShownCountry, weatherData }) => {
  if (data.length > MAX_COUNTRIES) {
    return <div>Too many matches, specify another filter</div>
  } else if (data.length === 1) {
    return <CountryData country={ data[0] } weather={ weatherData } />
  } else {
    // ccn3 used for key because https://en.wikipedia.org/wiki/ISO_3166-1_numeric
    return (
      <div>
        { data.length > MAX_COUNTRIES
          ? <p>Too many matches, specify another filter</p>
          : data.map(c => (
            <SearchResult key={ c.ccn3 } country={ c } onClick={ () => setShownCountry(c) } />
          )) }
      </div>
    )
  }
}

export default SearchResults