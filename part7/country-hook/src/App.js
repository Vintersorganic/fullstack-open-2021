import React, { useState } from 'react'
import { useCountry } from './hooks'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}



const Country = ({ country }) => {
  
  if (!country) {
    return null
  }

  if (country.length === 0) {
    return (
      <div>
        not found...
      </div>
    )
  }

 
  
  const foundCountry = country[0]
  return (
    <div>
      <h3>{foundCountry.name.common} </h3>
      <div>capital {foundCountry.capital} </div>
      <img src={foundCountry.flags[0]} height='100' alt={`flag of ${foundCountry.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
