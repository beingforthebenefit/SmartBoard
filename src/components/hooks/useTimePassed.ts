import { useEffect, useState } from "react"

const useTimePassed = (date: Date) => {
    const [timePassed, setTimePassed] = useState(Date.now() - date.getTime())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimePassed(Date.now() - date.getTime())
        }, 1000)
        return () => clearInterval(timer)
    }, [date])

    return timePassed
}

export default useTimePassed