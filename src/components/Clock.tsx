import React, { useState, useEffect } from 'react'
import { Text } from '@nextui-org/react'
import styled from 'styled-components'

const ClockContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
`

const TimeText = styled(Text)`
  color: #fff;
  font-size: 3rem; // Adjust the font size as needed
  font-weight: bold;
  line-height: 1;
`

const DateText = styled(Text)`
  color: #fff;
  font-size: 1.5rem; // Adjust the font size as needed
`

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [])

  const tick = () => {
    setTime(new Date())
  }

  const addZero = (i: number) => {
    var n = i.toString()
    if (i < 10) {
      n = "0" + i
    }
    return n
  }

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    let minutes = addZero(date.getMinutes())
    let seconds = addZero(date.getSeconds())
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date) => {
    const day = addZero(date.getDate())
    const month = addZero(date.getMonth() + 1)
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  return (
    <ClockContainer>
      <TimeText className="time">{formatTime(time)}</TimeText>
      <DateText className="date">{formatDate(time)}</DateText>
    </ClockContainer>
  )
}

export default Clock
