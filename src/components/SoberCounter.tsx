import React from 'react'
import { Text, Grid, Card } from '@nextui-org/react'
import useTimePassed from './hooks/useTimePassed'

const SoberCounter = () => {
  const soberDate = new Date('2022-07-19 22:57:00')
  const timePassed = useTimePassed(soberDate)

  const calculateTime = (startDate: Date) => {
    const currentDate = new Date()
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

    const totalHours = Math.floor(timePassed / (1000 * 60 * 60))
    const hours = totalHours % 24

    return { years, months, days, hours }
  }

  const { years, months, days, hours } = calculateTime(soberDate)

  return (
    <>
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
            <Text style={{textAlign: 'center'}}>{hours > 1 ? 'Hours' : 'Hour'}</Text>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  )
}

export default SoberCounter
