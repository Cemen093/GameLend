import React, {useEffect, useState} from 'react';
import '../styles/slider.css'
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE} from "../utils/consts";

const Slider = ({items, className, style, ...props}) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pauseTimeout, setPauseTimeout] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
            }
        }, 7000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleButtonClick = () => {
        setIsPaused(true);
        clearTimeout(pauseTimeout);

        const newPauseTimeout = setTimeout(() => {
            setIsPaused(false);
        }, 15000);

        setPauseTimeout(newPauseTimeout);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
        handleButtonClick();
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
        handleButtonClick();
    };

    const handleDot = (index) => {
        setCurrentIndex(index);
        handleButtonClick();
    };

    const handleImg = (id) => {
        navigate(GAME_ROUTE + '/' + id)
    }

    function getSliderContent() {
        return (
            <div className="slider-content">
                <div className="slider-image-container">
                    <img
                        className="slider-image"
                         src={items[currentIndex].img} alt="Product"
                        onClick={() => {handleImg(items[currentIndex].id)}}
                    />
                </div>
                <div className="slider-details">
                    <div className="slider-price">{items[currentIndex].price} ₴</div>
                    <div className="slider-description">{items[currentIndex].description}</div>
                    <div className="slider-platforms">
                        {items[currentIndex].platforms.map((platform, index) => (
                            <div key={index} className="slider-platform">{platform}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={"slider " + className} style={style} {...props}>
            <div className="slider-navigation">
                <button className="slider-button" onClick={handlePrev}>&lt;</button>
                {getSliderContent()}
                <button className="slider-button" onClick={handleNext}>&gt;</button>
            </div>
            <div className="slider-dots">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDot(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;