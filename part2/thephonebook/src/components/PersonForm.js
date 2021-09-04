import React from 'react'

const PersonForm = ({addPersons, handleNames, newName, handlePhoneNumber }) => {
    return (
        <form onSubmit={addPersons}>
        <div>
          name: <input onChange={handleNames} value={newName}/>
        </div>
        <div>number: <input onChange={handlePhoneNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
