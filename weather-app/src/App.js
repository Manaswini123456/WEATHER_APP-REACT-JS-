import React, { useState } from 'react';
const api = {
  key:"a3da68a2225617bb99cbaecd1cd1d1b0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    

    return `${day} ${date} ${month} ${year}`
  }

  const timeBuilder = (d) =>{
    let hours = d.getHours();
    let minutes = d.getMinutes();
    

    return `The time is : ${hours}hr(s) ${minutes}minutes`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? (weather.weather[0].main === 'Rain'? 'app_rain':'app_warm') : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search for a city of your choice"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className='date'>{timeBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              Current Temperature : {(weather.main.temp)}°C
              <br></br>
              
              Min temperature : {(weather.main.temp_min)}°C
              <br></br>
              Max temperature : {(weather.main.temp_max)}°C
              <br></br>
              Humidity : {(weather.main.humidity)}
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App