import React from 'react';
import styles from './pageContent.module.css'

const PageContent = ({className='', style={}, children}) => {
    return (
        <div className={`${styles.pageContent}  ${className}`} style={style}>
            {children}
        </div>
    );
};

export default PageContent;
