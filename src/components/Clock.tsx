// components/Clock.tsx
import React, { useState, useEffect } from 'react'

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
    <div className="clock-container">
      <div className="time">{formatTime(time)}</div>
      <div className="date">{formatDate(time)}</div>
    </div>
  )
}

export default Clock
