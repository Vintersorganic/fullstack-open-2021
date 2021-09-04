import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  /* App State */
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState('')

  const filteredPersonsNames = showFiltered 
  ? persons.filter(person => person.name.toLowerCase().search(showFiltered.toLowerCase()) !== -1) 
  : persons

  /* Event Handlers */
  const addPersons = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhoneNumber
    }
    persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
    ?
    alert(`${newName} is already added to phonebook`)
    :
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNames = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setShowFiltered(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPersons={addPersons}
        handleNames={handleNames}
        newName={newName}
        handlePhoneNumber={handlePhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersonsNames={filteredPersonsNames} />
    </div>
  )
}

export default App