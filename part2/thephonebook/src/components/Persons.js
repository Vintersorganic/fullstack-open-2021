import React from 'react'

const Persons = ({ filteredPersonsNames, deletePerson }) => {
    return (
            <ul>
        {
          filteredPersonsNames.map(person => person.name ? 
            <li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id) }>delete  </button></li>
            : null
          )
        }
      </ul>
    )
}

export default Persons
