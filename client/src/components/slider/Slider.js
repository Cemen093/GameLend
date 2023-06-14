import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE, ORDERING_ROUTE} from "../../utils/consts";
import styles from "./slider.module.css"
import {observer} from "mobx-react-lite";
import WhiteButton from "../buttons/WhiteButton";

const Slider = ({items, loading = false, small = false, className = '', style = {}, ...props}) => {
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

    const Item = ({item, small, loading}) => {
        if (loading) {
            return (
                <div className={styles.itemContainer}>
                    <div className={styles.itemImageContainer}>
                        <div className={`${styles.itemImage} ${styles.itemImageSkeleton}`}/>
                    </div>
                    <div className={styles.itemDetails}>
                        <WhiteButton loading={loading} className={styles.itemPriceButton}/>
                        <div className={styles.itemDescriptionContainer}>
                            <p className={`${styles.itemDescription} ${small && styles.itemDescriptionSmall} ${styles.itemDescriptionSkeleton}`}></p>
                        </div>
                        <div className={styles.itemPlatformContainer}>
                            <div className={`${styles.itemPlatform} ${styles.platformOneSkeleton}`}/>
                            <div className={`${styles.itemPlatform} ${styles.platformTwoSkeleton}`}/>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={styles.itemContainer}>
                <div className={styles.itemImageContainer}>
                    <img
                        className={styles.itemImage}
                        src={process.env.REACT_APP_API_URL + '/' + item.imgName} alt="Product"
                        onClick={() => {
                            handleImg(item.id)
                        }}
                    />
                </div>
                <div className={styles.itemDetails}>
                    <WhiteButton onClick={handleBuy} className={styles.itemPriceButton}>{item.price} ₴</WhiteButton>
                    <div className={styles.itemDescriptionContainer}>
                        <p className={`${styles.itemDescription} ${small && styles.itemDescriptionSmall}`}>
                            {item.description}
                        </p>
                    </div>
                    <div className={styles.itemPlatformContainer}>
                        {item.platforms.map((platform, index) => (
                            <div key={index} className={`${styles.itemPlatform} ${small && styles.itemPlatformSmall}`}>{platform.title}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const Dots = ({items, small, indexActive, handleDot, loading}) => {
        if (loading || items?.length === 0) {
            return (
                <div className={styles.dotContainer}>
                    {[...Array(small ? 6 : 10)].map((_, index) =>
                        <div key={index} className={`${styles.dot}`}/>
                    )}
                </div>
            )
        }

        return (
            <div className={styles.dotContainer}>
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === indexActive && styles.dotActive}`}
                        onClick={() => handleDot(index)}
                    />
                ))}
            </div>
        )
    }

    const SliderEmpty = () => {
        return (
            <div className={styles.navigationContainer}>
                <button className={styles.button}>&lt;</button>
                <div className={`${styles.empty}`}>Слайдер порожній</div>
                <button className={styles.button}>&gt;</button>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${small && styles.containerSmall}`} style={style} {...props}>
            {!loading && items.length === 0 ?
                <SliderEmpty/>
                :
                <div className={styles.navigationContainer}>
                    <button className={styles.button} onClick={handlePrev}>&lt;</button>
                    <Item item={items[currentIndex]} small={small} loading={loading}/>
                    <button className={styles.button} onClick={handleNext}>&gt;</button>
                </div>
            }
            <Dots items={items} small={small} indexActive={currentIndex} handleDot={handleDot} loading={loading}/>
        </div>
    );
};

export default observer(Slider);
