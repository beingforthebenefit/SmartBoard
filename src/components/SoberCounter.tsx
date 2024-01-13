import React, { useEffect, useMemo, useState } from 'react'
import { Text, Grid, Card } from '@nextui-org/react'

const SoberCounter = () => {
  const soberDate = useMemo(() => new Date('2022-07-19 22:57:00'), [])
  const [timePassed, setTimePassed] = useState(Date.now() - soberDate.getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(Date.now() - soberDate.getTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [soberDate])

  const calculateTime = (startDate: Date, currentDate: Date) => {
    let years = currentDate.getFullYear() - startDate.getFullYear()
    let months = currentDate.getMonth() - startDate.getMonth()
    let days = currentDate.getDate() - startDate.getDate()

    if (days < 0) {
      months--
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0)
      days += previousMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    return { years, months, days }
  }

  const { years, months, days } = calculateTime(soberDate, new Date())

  const hours = Math.floor(timePassed / (1000 * 60 * 60)) % 24

  return (
    <div>
      <Text h3 style={{textAlign: 'center'}}>Sober Time</Text>
      <Grid.Container gap={2} justify="center">
      <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{years}</Text>
            <Text style={{textAlign: 'center'}}>{years > 1 ? 'Years' : 'Year'}</Text>
          </Card>
        </Grid>
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{months}</Text>
            <Text style={{textAlign: 'center'}}>{months > 1 ? 'Months' : 'Month'}</Text>
          </Card>
        </Grid>
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{days}</Text>
            <Text style={{textAlign: 'center'}}>{days > 1 ? 'Days' : 'Day'}</Text>
          </Card>
        </Grid>
        <Grid xs={24} sm={3}>
          <Card>
            <Text h4 style={{textAlign: 'center'}}>{hours}</Text>
            <Text style={{textAlign: 'center'}}>{hours > 1 ? 'Hours' : 'Hours'}</Text>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  )
}

export default SoberCounter
