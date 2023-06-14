import React from 'react';
import styles from './buttons.module.css'
import {observer} from "mobx-react-lite";

const RoundImageButton = ({ image, diameter, alt='img-btn', loading, onClick, className = '' }) => {

    const imageStyle = {
        width: `${diameter}px`,
        height: `${diameter}px`,
    };

    if (loading) {
        return <div
            className={`${styles.roundImageButton} ${styles.roundImageButtonSkeleton} ${className}`}
            style={imageStyle}
        />
    }

    return <img
            className={`${styles.roundImageButton} ${className}`}
            style={imageStyle}
            src={image}
            onClick={onClick}
            alt={alt}
        />
};

export default observer(RoundImageButton);
