import axios from 'axios'
import { useState, useEffect } from 'react'
import { WeatherData } from '../../types'

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=37.7749&lon=-122.4194&exclude=minutely,alerts&appid=${API_KEY}&units=imperial`

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<{message: string} | null>(null)

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        const processedData = {
          current: res.data.current,
          daily: res.data.daily.slice(0, 5)
        }
        setWeatherData(processedData)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { weatherData, loading, error }
}

export default useWeather