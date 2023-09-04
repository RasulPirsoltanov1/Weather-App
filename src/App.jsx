import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const locationHandler = (e) => {
    setLocation(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`);
        console.log(response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (location) {
      fetchData();
    }
  }, [location]);
  console.log(weatherData);

  return (
    <>
      <div className="app-container">
        <h1>Weather Application</h1>
        <div className="input-container">
          <input placeholder='city...' id='cityName' onChange={locationHandler} />
        </div>
        {weatherData && (
          <div className='weather-container'>
            <h2>Weather for {weatherData.location.name}</h2>
            <div className="card-container">
              {weatherData.forecast.forecastday.map((day, index) => (
                <div key={index} className={day.day.maxtemp_c > 30 ? "hot card" : "card"}>
                  <h2>Day {index + 1}</h2>
                  <h3>Date: {day.date}</h3>
                  <p>Max Temperature: {day.day.maxtemp_c}°C</p>
                  <p>Min Temperature: {day.day.mintemp_c}°C</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
