import React from 'react';
import styles from "../../styles/buttons.module.css"

const WhiteButton = ({className='', style={}, onClick, children, loading}) => {

    if (loading) {
        return <div
            className={`${styles.whiteButton} ${styles.whiteButtonLoading} ${className}`}
            style={style}
            onClick={onClick}
        />
    }

    return (
        <div
            className={`${styles.whiteButton} ${className}`}
             style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default WhiteButton;
