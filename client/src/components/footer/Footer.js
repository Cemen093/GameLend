import React from 'react';
import styles from "./footer.module.css";

const Footer = () => {

    return (
        <div className={`${styles.footer}`}>
            <div className={styles.title}>Контакти:</div>
            <div className={styles.text}>н. тел. +3801233211231</div>
            <div className={styles.text}>ел. п. GameLend@3g.ua</div>
        </div>
    );
};

export default Footer;
