import React, { useState, useEffect } from 'react'

const BackgroundImage = ({ imageUrls, interval }) => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length)
        }, interval * 60000)

        return () => clearInterval(timer)
    }, [imageUrls, interval])

    return (
        <div className="background-image-wrapper">
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrls[currentImage]})`,
                    filter: 'blur(15px) brightness(60%)'
                }}
            />
            <div
                className="foreground-image"
                style={{
                    backgroundImage: `url(${imageUrls[currentImage]})`
                }}
            />
        </div>
    )
}

export default BackgroundImage
