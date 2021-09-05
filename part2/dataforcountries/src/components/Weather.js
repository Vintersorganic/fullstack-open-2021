import React from 'react'

const Weather = ({ capital, weather }) => {
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p><strong>temperature: </strong>  {weather[0].main.temp} ºC</p>
            <img src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`} alt="temperature"/> 
            <p><strong>wind: </strong>{weather[0].wind.speed} m/s {weather[0].wind.deg} degrees</p>
        </div>
    )
}

export default Weather
