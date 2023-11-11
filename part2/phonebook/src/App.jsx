import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

import PhonebookEntryForm from './components/PhonebookEntryForm'
import PhonebookContent from './components/PhonebookContent'
import Notification from './components/Notification'
import Filter from './components/Filter'

const MSG_TIMEOUT = 4000

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    phonebook.getPhonebook()
             .then(persons => setPersons(persons))
  }, [])

  const removePersonLocally = id => setPersons(persons.filter(person => person.id !== id))

  const showMessage = (message, setter) => {
    setter(message)
    setTimeout(() => {
      setter('')
    }, MSG_TIMEOUT)
  }

  const showSuccess = (message) => showMessage(message, setSuccessMsg)
  const showError = (message) => showMessage(message, setErrorMsg)

  const handleDelete = (name, id) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      phonebook.deletePhonebookEntry(id)
        .then(() => {
          showSuccess(`Successfully deleted ${name}!`)
        })
        .catch((err) => {
          showError(`${name} was already deleted: ${err.message} ${err.response.statusText}`)
        })
        .then(() => removePersonLocally(id))
    }
  }

  const handleFilterChange = (e) => {
    setNewNameFilter(e.target.value)
  }

  const addToPhonebook = (newPerson) => {
    phonebook.addNewPhonebookEntry(newPerson)
      .then(newEntry => {
        setPersons(persons.concat(newEntry))
        setNewName('')
        setNewNumber('')
      })
      .then(() => showSuccess(`Successfully added ${newPerson.name}!`))
      .catch(err => showError(`Error adding ${newPerson.name}: ${err.message} ${err.response.statusText}`))
  }

  const replacePerson = (id, newPerson) => {
    phonebook.replacePhonebookEntry(id, newPerson)
      .then(res => {
        setPersons(persons.map(p => p.id === id ? res.data : p))
        setNewName('')
        setNewNumber('')
      })
      .then(() => showSuccess(`Successfully replaced ${newPerson.name}'s entry!`))
      .catch(err => {
        showError(`Error replacing ${newPerson.name} as they may have already been deleted: ${err.message} ${err.response.statusText}`)
        removePersonLocally(id)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson
        && window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
      replacePerson(existingPerson.id, {
        ...existingPerson,
        number: newNumber
      })
    } else {
      addToPhonebook({
        name: newName,
        number: newNumber
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMsg} className="success" />
      <Notification message={errorMsg} className="error" />
      <Filter text="filter names containing" value={newNameFilter} onChange={handleFilterChange} />
      <h2>add new</h2>
      <PhonebookEntryForm
        onSubmit={handleSubmit}
        newName={newName}
        onNewNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        onNewNumberChange={e => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <PhonebookContent
        persons={persons}
        newNameFilter={newNameFilter}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App