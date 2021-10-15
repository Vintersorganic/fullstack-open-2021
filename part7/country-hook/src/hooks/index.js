import { useState, useEffect } from "react";
import axios from 'axios';

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      axios
        .get(`https://restcountries.com/v3/name/${name}?fullText=true`)
        .then(response => {
          console.log(response.data[0], "RESPONSE");
          setCountry(response.data)
        })
      }, [name])
   

    if (name === '') {
      return null
    }

    if (country[0] === undefined) {
      return []
  }
    
    return country
  }