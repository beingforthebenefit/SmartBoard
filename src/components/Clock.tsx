import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h1>{time.toLocaleTimeString()}</h1>
            <h2>{time.toDateString()}</h2>
        </div>
    );
}

export default Clock;