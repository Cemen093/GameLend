import React from 'react';
import styles from "./buttons.module.css"

const Button = ({onClick, children, loading, active = true, className = '', style = {}}) => {

    const handleClick = (e) => {
        if (active){
            onClick(e)
        }
    }

    return (
        <div className={`${className} ${styles.button} ${!active && styles.notActive} ${loading && styles.buttonSkeleton}`}
             style={style} onClick={handleClick}>
            {!loading && children}
        </div>
    );
};

export default Button;
