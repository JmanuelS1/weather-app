// import { useState, useEffect } from 'react'
// import './App.css'
// import Loading from './components/Loading'
// import WeatherDisplay from './components/WeatherDisplay'
// import SearchBar from './components/SearchBar'

// function App () {
//   const [coords, setCoords] = useState()
//   const [weatherData, setWeatherData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const success = (pos) => {
//     const obj = {
//       lat: pos.coords.latitude,
//       lon: pos.coords.longitude
//     }
//     setCoords(obj)
//   }

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(success, error)
//   }, [])

//   useEffect(() => {
//     if (coords) {
//       const apiKey = "10ecdf91afe99cb7488454ceb7f9db99"
//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`

//       fetch(url)
//         .then(response => response.json())
//         .then(data => {
//           setWeatherData(data)
//           setLoading(false)
//         })
//         .catch(err => setError(err))
//     }
//   }, [coords])

//   const handleSearch = (query) => {
//     setLoading(true)
//     setError(null)
//     const apiKey = "10ecdf91afe99cb7488454ceb7f9db99"
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         setWeatherData(data)
//         setLoading(false)
//       })
//       .catch(err => setError(err))
//   }

//   return (
//     <div  className='container'>
//       <h1>Weather App</h1>
//       {loading && <Loading />}
//       {error && <div>Error: {error.message}</div>}
//       {weatherData && (
//         <>
//           <WeatherDisplay weatherData={weatherData} />
//           <SearchBar onSearch={handleSearch} />
//         </>
//       )}
//     </div>
//   )
// }

// export default App








// import React, { useState, useEffect } from 'react'
// import './App.css'
// import axios from 'axios'
// import WeatherDisplay from './components/WeatherDisplay'
// import SearchBar from './components/SearchBar'

// function App () {
//   const [coords, setCoords] = useState()
//   const [weather, setWeather] = useState()
//   const [temp, setTemp] = useState()
//   const [isLoading, setIsLoading] = useState(true)
//   const [currentLocationWeather, setCurrentLocationWeather] = useState()
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     getCurrentLocation()
//   }, [])

//   useEffect(() => {
//     if (coords && searchQuery === '') {
//       getWeatherByCoords(coords.lat, coords.lon)
//       return
//     }

//     const apiKey = "10ecdf91afe99cb7488454ceb7f9db99"
//     let url

//     if (searchQuery) {
//       url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`
//     } else {
//       url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`
//     }

//     axios.get(url)
//       .then(res => {
//         const cel = (res.data.main.temp - 273.15).toFixed(1)
//         const fah = (cel * 9 / 5 + 32).toFixed(1)

//         setTemp({ cel, fah })
//         setWeather(res.data)
//         setIsLoading(false)
//       })
//       .catch(err => {
//         console.log("Error al obtener clima:", err)
//         setIsLoading(false)
//       })
//   }, [coords, searchQuery])

//   const getCurrentLocation = () => {
//     console.log("Obteniendo ubicación actual...")
//     navigator.geolocation.getCurrentPosition(success, error)
//   }

//   const success = (pos) => {
//     console.log("Ubicación actual obtenida:", pos.coords)
//     const obj = {
//       lat: pos.coords.latitude,
//       lon: pos.coords.longitude
//     }
//     setCoords(obj)
//     getWeatherByCoords(obj.lat, obj.lon)
//   }

//   const error = (err) => {
//     console.log("Error al obtener ubicación:", err)
//     setIsLoading(false)
//   }

//   const getWeatherByCoords = (lat, lon) => {
//     const apiKey = "10ecdf91afe99cb7488454ceb7f9db99"
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

//     axios.get(url)
//       .then(res => {
//         const cel = (res.data.main.temp - 273.15).toFixed(1)
//         const fah = (cel * 9 / 5 + 32).toFixed(1)

//         setTemp({ cel, fah })
//         setCurrentLocationWeather(res.data)
//         setIsLoading(false)
//       })
//       .catch(err => {
//         console.log("Error al obtener clima:", err)
//         setIsLoading(false)
//       })
//   }

//   const handleSearch = (query) => {
//     setSearchQuery(query)
//   }

//   const handleReturnToCurrentLocation = () => {
//     getCurrentLocation()
//     setSearchQuery('')
//   }

//   return (
//     <div className='container'>
//       {isLoading ?
//         <h2>Loading...</h2> :
//         <WeatherDisplay
//           weather={weather || currentLocationWeather}
//           temp={temp} />
//       }
//       <SearchBar handleSearch={handleSearch} />
//       {searchQuery && weather &&
//         (weather.coord.lat !== coords.lat || weather.coord.lon !== coords.lon) && (
//           <button onClick={handleReturnToCurrentLocation}>Regresar a mi ubicación</button>
//         )}

//     </div>
//   );
// }

// export default App;








import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WeatherDisplay from './components/WeatherDisplay'
import SearchBar from './components/SearchBar'

function App () {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [currentLocationWeather, setCurrentLocationWeather] = useState()
  const [searchQuery, setSearchQuery] = useState('')

  const success = (pos) => {
    console.log("Ubicación actual obtenida:", pos.coords)
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
    getWeatherByCoords(obj.lat, obj.lon)
  }

  const error = (err) => {
    console.log("Error al obtener ubicación:", err)
    setIsLoading(false)
  }

  const getCurrentLocation = () => {
    console.log("Obteniendo ubicación actual...")
    navigator.geolocation.getCurrentPosition(success, error)
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getWeatherByCoords = (lat, lon) => {
    const apiKey = "10ecdf91afe99cb7488454ceb7f9db99"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    axios.get(url)
      .then(res => {
        const cel = (res.data.main.temp - 273.15).toFixed(1)
        const fah = (cel * 9 / 5 + 32).toFixed(1)

        setTemp({ cel, fah })
        setCurrentLocationWeather(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log("Error al obtener clima:", err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
      if (!coords) {
      return
    }

    const apiKey = "10ecdf91afe99cb7488454ceb7f9db99"
    let url

    if (searchQuery) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`
    }

    axios.get(url)
      .then(res => {
        const cel = (res.data.main.temp - 273.15).toFixed(1)
        const fah = (cel * 9 / 5 + 32).toFixed(1)

        setTemp({ cel, fah })
        setWeather(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log("Error al obtener clima:", err)
        setIsLoading(false)
      })
  }, [coords, searchQuery])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleReturnToCurrentLocation = () => {
    getCurrentLocation()
    setSearchQuery('')
  }

  return (
    <div className='container'>
      {isLoading ?
        <h2>Loading...</h2> :
        <WeatherDisplay
          weather={weather || currentLocationWeather}
          temp={temp} />
      }
      <SearchBar handleSearch={handleSearch} />
      {searchQuery && weather &&
        (weather.coord.lat !== coords.lat || weather.coord.lon !== coords.lon) && (
          <button onClick={handleReturnToCurrentLocation}>Regresar a mi ubicación</button>
        )}

    </div>
  );
}

export default App;

