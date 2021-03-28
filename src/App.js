import { useState } from 'react';
import './App.css';

const API = {
  key: 'Get a key :P',
  base: 'https://api.openweathermap.org/data/2.5/'
};


function App() {
  let [query, setQuery] = useState('');
  const [weather, setWeather] = useState({
    temp: 0,
    city: 'Start looking for your city',
    desc: ''
  });

  const search = e => {
    if(e.key === 'Enter') {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
      .then(res => {
        if(res.ok){
          return res.json();
        }else{
          throw new Error(res.status);
        }
      })
      .then(data => setWeather({
        temp: data.main.temp,
        city: `${data.name} - ${data.sys.country}`,
        desc: data.weather[0].main
      }))
      .catch(err => setWeather({
        temp: -1,
        city: 'City not found',
        desc: 'Check your spelling'
      }));
    }
  };

  const dateBuldier = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[date.getDay()];
    const d = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();


    return `${day} ${d} ${month} ${year}`;
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className={weather.temp > 25 ? 'App warm' : 'App'}>
      <main>
        <div className="searchBox">
          <input
            type="text"
            className="searchBar"
            placeholder="Search for your city..."
            onInput={handleInput}
            onKeyDown={search}
            value={query}
            />
        </div>
      
        <div className="locationBox">
          <div className="locationBox__location">{weather.city}</div>
          <div className="locationBox__date">{dateBuldier(new Date())}</div>
        </div>
      
        <div className="weatherBox">
          <div className="weatherBox__temp">{weather.temp} °C</div>
          <div className="weatherBox__weather">{weather.desc}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
