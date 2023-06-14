import React from 'react';
import Button from "./Button";
import styles from "./buttons.module.css"

const OutlineButton = ({onClick, children, loading, active = true, className = '', style = {}, ...props}) => {
    return (
        <Button className={`${className} ${styles.outlineButton} ${loading && styles.outlineButtonSkeleton}`}
                style={style} onClick={onClick} active={active}>
            {children}
        </Button>
    );
};

export default OutlineButton;
