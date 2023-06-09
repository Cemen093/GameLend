import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE, ORDERING_ROUTE} from "../../utils/consts";
import styles from "./slider.module.css"

const Slider = ({items, className = '', style, loading = false, small = false, ...props}) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [pauseTimeout, setPauseTimeout] = useState(null);

    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                if (!isPaused) {
                    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
                }
            }, 7000);

            return () => clearInterval(interval);
        }
    }, [isPaused, items.length]);

    if (loading) {
        return <div>Загрузка данных пока не реализована</div>
    }

    if (items.length <= 0) {
        return <div>Пустой слайдер, пока не реализовано</div>
    }

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

    const handleBuy = () => {
        navigate(ORDERING_ROUTE + '/game/' + items[currentIndex]?.id)
    }

    function getSliderContent() {
        return (
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img
                        className={styles.image}
                        src={process.env.REACT_APP_API_URL + '/' + items[currentIndex].imgName} alt="Product"
                        onClick={() => {
                            handleImg(items[currentIndex].id)
                        }}
                    />
                </div>
                <div className={styles.details}>
                    <div className={styles.price} onClick={handleBuy}>{items[currentIndex].price} ₴</div>
                    <div className={styles.description}>
                        <p className={`${styles.descriptionText} ${small ? styles.descriptionTextSmall : ''}`}>
                            {items[currentIndex].description}
                        </p>
                    </div>
                    <div className={styles.platformContainer}>
                        {items[currentIndex].platforms.map((platform, index) => (
                            <div key={index} className={styles.platform}>{platform.title}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${small ? styles.containerSmall : ''}`} style={style} {...props}>
            <div className={styles.navigation}>
                <button className={styles.button} onClick={handlePrev}>&lt;</button>
                {getSliderContent()}
                <button className={styles.button} onClick={handleNext}>&gt;</button>
            </div>
            <div className={styles.dotContainer}>
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                        onClick={() => handleDot(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
