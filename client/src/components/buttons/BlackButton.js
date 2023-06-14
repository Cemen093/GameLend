import React from 'react';
import styles from "./buttons.module.css"
import Button from "./Button";

const BlackButton = ({onClick, children, loading, active = true, className = '', style = {}, ...props}) => {
    return (
        <Button className={`${className} ${styles.blackButton} ${loading && styles.blackButtonSkeleton}`}
                style={style} onClick={onClick} active={active}>
            {children}
        </Button>
    );
};

export default BlackButton;
