import axios from 'axios'

const APIKEY = import.meta.env.VITE_OPENWEATHERMAP

const api = (lat, lon, units, lang) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${units}&lang=${lang}`

const getCurrCapitalWeather = country => {
    const [lat, lng] = country.capitalInfo.latlng
    return axios.get(api(lat, lng, 'imperial', 'en'))
                .then(res => res.data)
}

export default { getCurrWeather: getCurrCapitalWeather }