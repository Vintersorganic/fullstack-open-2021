import React, { useState, useEffect} from "react";
import axios from "axios"
import CountryList from "./components/CountryList";

function App() {

  const [countries, setCountries] = useState([])
  const [showFiltered, setshowFiltered] = useState('')

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
  })
  }, [])

  const filteredCountries = showFiltered
  ? countries.filter(country => country.name.toLowerCase().search(showFiltered.toLowerCase()) !== -1)
  : countries


  const handleFilter = (event) => {
    setshowFiltered(event.target.value)
  }
  
  return (
    <div>
      <div>find countries: <input onChange={handleFilter}/> </div>
      <CountryList filteredCountries={filteredCountries} setCountries={setCountries}/>
    </div>
  );
}

export default App;
