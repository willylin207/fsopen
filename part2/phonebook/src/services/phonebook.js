import axios from 'axios'

const SERVER_URL = 'http://localhost:3001/persons'

function getPhonebook() {
    return axios.get(SERVER_URL)
                .then(res => res.data)
}

function addNewPhonebookEntry(entry) {
    return axios.post(SERVER_URL, entry)
                .then(res => res.data)
}

function deletePhonebookEntry(id) {
    return axios.delete(`${SERVER_URL}/${id}`)
}

function replacePhonebookEntry(id, newData) {
    console.log(newData)
    return axios.put(`${SERVER_URL}/${id}`, newData)
}

export default { getPhonebook, addNewPhonebookEntry, deletePhonebookEntry, replacePhonebookEntry }