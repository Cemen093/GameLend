import React from 'react';
import styles from '../../styles/buttons.module.css'

const RoundImageButton = ({ image, diameter, onClick, alt='img-btn', loading, className = '' }) => {

    const imageStyle = {
        width: `${diameter}px`,
        height: `${diameter}px`,
    };

    if (loading) {
        return <div
            className={`${styles.roundImageButton} ${styles.roundImageButtonLoading} ${className}`}
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

export default RoundImageButton;
