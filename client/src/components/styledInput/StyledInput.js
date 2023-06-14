import React from 'react';
import {observer} from "mobx-react-lite";
import styles from './styledInput.module.css'

const StyledInput = ({title, value, setValue, className = '', placeholder, ...props}) => {
    return (
        <div className={`${styles.container} ${className}`}  {...props}>
            {title && <div className={styles.title}>{title}</div>}
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder || "Введіть данні..."}
            />
        </div>
    );
};

export default StyledInput;
