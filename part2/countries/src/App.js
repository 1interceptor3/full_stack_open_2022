import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
    const [weather, setWeather] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => {
                setLoaded(true);
                setWeather(response.data);
            })
    }, [])

    console.log(weather);
    if (loaded) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common + " flag"}/>

                <h2>Weather in {country.capital}</h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        )
    } else {
        return (
            <p>Loading...</p>
        )
    }
}

const Search = ({ countries, query, setQuery }) => {
    if (countries.length === 1) {
        return (<Country country={countries[0]} />)
    } else if (query) {
        if (countries.length <= 10) {
            return (
                <ul>
                    {countries.map(country => (
                        <li key={country.cca2}>
                            {country.name.common}
                            <button onClick={() => {setQuery(country.name.common)}}>show</button>
                        </li>
                    ))}
                </ul>
            )
        } else {
            return (
                <p>Too much</p>
            )
        }
    }
}

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setAllCountries(response.data);
            })
    }, []);

    const c = allCountries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <p>
                find countries
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
            </p>
            <Search countries={c} query={query} setQuery={setQuery} />

        </div>
    )
}

export default App;
