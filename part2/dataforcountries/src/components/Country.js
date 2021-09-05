import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ( { country }) => {

    const [weather, setWeather] = useState([])
    
    // useEffect(() => {
    //     const params = {
    //       access_key: process.env.REACT_APP_API_KEY,
    //       query: country.capital
    //     }
    
    //     axios.get('http://api.weatherstack.com/current', {params})
    //       .then(response => {
    //         const apiResponse = response.data;
    //         console.log(apiResponse)
    //         console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
    //         setWeather([apiResponse])
    //       }).catch(error => {
    //         console.log(error);
    //     })
    //   })
    
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                console.log(response.data, "response")   
                setWeather([response.data])
            })
    }, [country.capital])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital: {country.capital}
            </p>
            <p>
                population: {country.population}
            </p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag"/>
            {weather.length > 0 ? <Weather capital={country.capital} weather={weather}/> : null}
        </div>
    )
}

export default Country
