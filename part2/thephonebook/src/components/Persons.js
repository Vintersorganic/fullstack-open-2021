import React from 'react'

const Persons = ({ filteredPersonsNames }) => {
    return (
            <ul>
        {
          filteredPersonsNames.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>
          )
        }
      </ul>
    )
}

export default Persons
