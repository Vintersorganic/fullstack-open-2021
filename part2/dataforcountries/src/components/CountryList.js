import React from 'react'
import Country from './Country'

const CountryList = ({ filteredCountries, setCountries }) => {

    if (filteredCountries.length >= 10 ) {
        return (
          <span>Too many matches, specify another filter</span>  
        )
    }

    else if (filteredCountries.length === 1) {
        return (
            <Country country={filteredCountries[0]}/>
        )
    }

    else return (
        <ul>
            {filteredCountries.map(filteredCountry => 
              <li key={filteredCountry.name}>{filteredCountry.name} <button onClick={() => setCountries([filteredCountry])}>show</button></li> )}
        </ul>
    )
    /* It's important to set the state of countries (setCountries) to an array so the map method can work and it enters de else if condition*/
}

export default CountryList
