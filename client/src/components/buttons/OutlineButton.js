import React from 'react';
import styles from "../../styles/buttons.module.css"

const OutlineButton = ({className='', style={}, onClick, children}) => {
    return (
        <div className={`${styles.outlineButton} ${className}`} style={style} onClick={onClick}>
            {children}
        </div>
    );
};

export default OutlineButton;
