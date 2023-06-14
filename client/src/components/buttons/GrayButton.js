import React from 'react';
import Button from "./Button";
import styles from "./buttons.module.css"

const GrayButton = ({onClick, children, loading, active = true, className = '', style = {}, ...props}) => {
    return (
        <Button className={`${className} ${styles.grayButton} ${loading && styles.grayButtonSkeleton}`}
                style={style} onClick={onClick} active={active}>
            {children}
        </Button>
    );
};

export default GrayButton;
