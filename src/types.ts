export type WeatherData = {
  current: {
    temp: number
    weather: [{ main: string }]
  }
  daily: [
    {
      dt: number
      temp: {
        min: number
        max: number
      }
      weather: [{ main: string }]
    }
  ]
} | null