import React, { useState, useEffect } from 'react'
import { Text } from '@nextui-org/react'

const Clock = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="clock-wrapper">
            <Text h1>{time.toLocaleTimeString()}</Text>
            <Text h2>{time.toDateString()}</Text>
        </div>
    )
}

export default Clock