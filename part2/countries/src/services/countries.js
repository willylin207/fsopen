import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => axios.get(`${URL}/api/all`)
                          .then(res => res.data)

export default { getAll }