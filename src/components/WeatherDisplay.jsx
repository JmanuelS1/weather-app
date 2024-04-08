// import React, { useState } from 'react'

// function WeatherDisplay({ weatherData }) {
//   const [isCelsius, setIsCelsius] = useState(true)

//   const toggleTemperatureUnit = () => {
//     setIsCelsius(prevState => !prevState)
//   }

//   const temperature = isCelsius
//     ? `${Math.round(weatherData.main.temp - 273.15)}°C`
//     : `${Math.round((weatherData.main.temp - 273.15) * 9/5 + 32)}°F`

//   return (
//     <div className="weather-display">
//       <h2>{weatherData.name}, {weatherData.sys.country}</h2>
//       <p>Condition: {weatherData.weather[0].main}</p>
//       <p>Wind Speed: {weatherData.wind.speed} m/s</p>
//       <p>Cloudiness: {weatherData.clouds.all}%</p>
//       <p>Pressure: {weatherData.main.pressure} hPa</p>
//       <p>Temperature: {temperature}</p>
//       <button className='btn' onClick={toggleTemperatureUnit}>Toggle Temperature Unit</button>
//     </div>
//   )
// }

// export default WeatherDisplay



import React, { useState } from 'react'
import './styles/weatherDisplay.css'

const WeatherDisplay = ({ weather, temp }) => {

  const [isCel, setIsCel] = useState(true)
  const [buttonText, setButtonText] = useState('Cambiar a °Fahrenheit')

  const handleTemp = () => {
    setIsCel(!isCel)
    setButtonText(isCel ? 'Cambiar a °Celsius' : 'Cambiar a °Fahrenheit')
  }

  const getTemperature = () => {
    if (isCel) {
      return `${temp?.cel} °C`
    } else {
      return `${temp?.fah} °F`
    }
  }

  return (
    <div className='weather-display'>
      <h1> Weather App</h1>
      <h2 className='weather__place'>{weather?.name} {weather?.sys?.country}</h2>
      <div className='weather__container'>
        <figure className='weather__img'>
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather image" />
        </figure>
        <div className="weather__info">
          <h3 className='weather __description'>{`"${weather?.weather[0].description}"`}</h3>
          <ul className='weather__list'>
            <li className='weather__item'><span>Wind speed: </span><span>{weather?.wind.speed} m/s</span></li>
            <li className='weather__item'><span>Clouds: </span><span>{weather?.clouds.all} %</span></li>
            <li className='weather__item'><span>Pressure: </span><span>{weather?.main.pressure} hPA</span></li>
          </ul>
        </div>
      </div>
      <h3>{getTemperature()}</h3>
      <button onClick={handleTemp}>
        {buttonText}
      </button>
    </div>
  )
}
export default WeatherDisplay
