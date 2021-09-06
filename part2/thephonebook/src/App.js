import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsServices from './services/persons'

const App = () => {

  /* App State */
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState('')
  const [message, setMessage] = useState(null)


  const filteredPersonsNames = showFiltered 
  ? persons.filter(person => person.name.toLowerCase().search(showFiltered.toLowerCase()) !== -1) 
  : persons

  /*Use effect*/ 
  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  /* Event Handlers */
  const addPersons = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhoneNumber
    }
                      
    let foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())

    if (foundPerson !== undefined) {
      if(window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumber = {...foundPerson, number: newPhoneNumber}
          personsServices
          .update(foundPerson.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
            setMessage(`Success. Changed ${returnedPerson.name} phone number.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setMessage(
              `Person '${foundPerson.name}' was already removed from server, cannot update!`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }

    else {
      personsServices
        .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setPhoneNumber('')
        setMessage(`Success. Added ${returnedPerson.name}.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
         })
    }
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personName.name}?`)) {
      personsServices
        .destroy(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          setMessage(
            `Person '${personName.name}' was already removed from server, cannot delete!`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
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
      <Notification message={message}/>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPersons={addPersons}
        handleNames={handleNames}
        newName={newName}
        handlePhoneNumber={handlePhoneNumber}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersonsNames={filteredPersonsNames} deletePerson={deletePerson}/>
    </div>
  )
}

export default App