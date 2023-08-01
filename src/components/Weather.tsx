import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Text, Divider, Row } from '@nextui-org/react';
import axios from 'axios';
import moment from 'moment';
import WeatherEmojis from './WeatherEmojis';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=37.7749&lon=-122.4194&exclude=minutely,alerts&appid=${API_KEY}&units=imperial`;

type WeatherData = {
  current: {
    temp: number;
    weather: [{ main: string }];
  };
  daily: [
    {
      dt: number;
      temp: { min: number; max: number };
      weather: [{ main: string }];
    }
  ];
} | null;

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        const processedData = {
          current: res.data.current,
          daily: res.data.daily.slice(0, 5)
        };
        setWeatherData(processedData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (!weatherData) {
    return <p>Loading...</p>;
  }

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
  );
  
};

export default Weather;
