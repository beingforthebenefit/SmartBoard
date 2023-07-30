import React, { useState, useEffect } from 'react';

const BackgroundImage = ({ imageUrls, interval }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length);
        }, interval * 60000);

        return () => clearInterval(timer);
    }, [imageUrls, interval]);

    return (
        <div className="background-image" style={{ backgroundImage: `url(${imageUrls[currentImage]})` }} />
    );
};

export default BackgroundImage;
