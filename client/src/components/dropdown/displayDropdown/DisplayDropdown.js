import React, {useEffect, useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {observer} from "mobx-react-lite";
import styles from "./displayDropdown.module.css";

const DisplayDropdown = ({title, items, loading, className = '', classNameMenu=''}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (!loading && items.length > 0) {
            setIsOpen(pref => !pref)
        }
    }

    return (
        <div className={`${className} ${styles.container}`} onClick={handleClick}>
            <div className={`${styles.titleContainer}`}>
                {loading
                    ?
                    <span className={styles.title}>{'Список порожній'}</span>
                    :
                    items?.length > 0
                        ?
                        <span className={styles.title}>{title}</span>
                        :
                        <span className={`${styles.title} ${styles.titleSkeleton}`}></span>
                }
                <FaChevronDown className={`${styles.icon}`}/>
            </div>
            {isOpen && (
                <ul className={`${styles.menu} ${classNameMenu}`}>
                    {items.map((item, i) =>
                        <li className={styles.item} key={i}>{item?.title}</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default observer(DisplayDropdown);
