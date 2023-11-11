import { useState, useEffect } from 'react'
import SearchField from './components/SearchField'
import SearchResults from './components/SearchResults'

import countries from './services/countries'
import openweathermap from './services/openweathermap'

function App() {
  const [searchText, setSearchText] = useState('')
  const [countryData, setCountryData] = useState([])
  const [shownCountry, setShownCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countries.getAll()
      .then(data => setCountryData(data))
      .catch(() => alert('Failed to fetch country data. Try reloading the page.'))
  }, [])

  useEffect(() => {
    if (!shownCountry) return
    openweathermap.getCurrWeather(shownCountry)
      .then(data => setWeatherData(data))
      .catch(() => alert('Failed to fetch weather data.'))
  }, [shownCountry])

  const relevantData = shownCountry ? [shownCountry] : countryData.filter(c => {
    const possibleNames = [
      c.name.common,
      // c.name.official,
      // ...(c.altSpellings)
    ].map(name => name.toLowerCase())
    const search = searchText.toLowerCase()
    return possibleNames.find(name => name.includes(search))
  })

  if (!shownCountry && relevantData.length === 1) setShownCountry(relevantData[0])

  const handleChange = e => {
    setSearchText(e.target.value)
    setShownCountry(null)
  }

  return (
    <>
      <h1>Countries</h1>
      <SearchField
        value={ searchText }
        onChange={ handleChange } />
      <SearchResults
        data={ relevantData }
        setShownCountry={ setShownCountry }
        weatherData={ weatherData } />
    </>
  )
}

export default App
