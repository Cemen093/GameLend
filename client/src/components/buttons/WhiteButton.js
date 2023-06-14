import React from 'react';
import styles from "./buttons.module.css"
import Button from "./Button";

const WhiteButton = ({onClick, children, loading, active = true, className = '', style = {}, ...props}) => {
    return (
        <Button className={`${className} ${styles.whiteButton} ${loading && styles.whiteButtonSkeleton}`}
                style={style} onClick={onClick} active={active}>
            {children}
        </Button>
    );
};

export default WhiteButton;
