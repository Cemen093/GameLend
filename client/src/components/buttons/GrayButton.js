import React from 'react';
import styles from "./buttons.module.css"

const GrayButton = ({className='', style={}, onClick, children, loading}) => {

    if (loading) {
        return <div className={`${styles.brayButton} ${styles.brayButtonLoading} ${className}`}
             style={style}
             onClick={onClick}
        />
    }
    return (
        <div className={`${styles.brayButton} ${className}`}
             style={style}
             onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GrayButton;
