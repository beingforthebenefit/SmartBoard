import React from 'react'
import { Container, Grid, Card, Text, Divider, Row } from '@nextui-org/react'
import useWeather from './hooks/useWeather'
import WeatherEmojis from './WeatherEmojis'
import moment from 'moment'

const Weather = () => {
  const { weatherData, loading, error } = useWeather()

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (!weatherData) return <Text>No weather data</Text>

  return (
    <Container className='weatherContainer'>
      <Text h1>
        {Math.round(weatherData.current.temp)} °F {WeatherEmojis[weatherData.current.weather[0].main]}
        <Text h3>{weatherData.current.weather[0].main}</Text>
        <Text className='high-low'>↑: {Math.round(weatherData.daily[0].temp.max)} °F, ↓: {Math.round(weatherData.daily[0].temp.min)} °F</Text>
      </Text>
      <Divider y={2} />
      <Grid.Container gap={2} justify="center">
        {weatherData.daily.slice(1).map((forecast, i) => (
          <Grid xs={6} sm={3} md={3} lg={3} xl={3} key={i}>
            <Card>
              <Row justify="center" className='dayContainer'>
                <Text>{moment.unix(forecast.dt).format('ddd')} {WeatherEmojis[forecast.weather[0].main]}
                  <Text>↑: {Math.round(forecast.temp.max)} °F, ↓: {Math.round(forecast.temp.min)}°</Text>
                </Text>
              </Row>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  )
  
}

export default Weather
