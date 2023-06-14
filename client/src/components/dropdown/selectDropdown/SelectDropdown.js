import React, {useEffect, useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {observer} from "mobx-react-lite";
import styles from "./selectDropdown.module.css";

const SelectDropdown = ({title, items, loading, selectedItem, setSelectedItem,
                            className = '', style = {}, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInit, setIsInit] = useState(false)

    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    useEffect(() => {
        if (!loading){
            selectItem(items[0])
            setIsInit(true)
        }
    }, [loading])

    if (loading || !isInit) {
        return (
            <div className={`${styles.container} ${className}`} style={style} {...props}>
                {title && <div className={styles.title}>{title}</div>}
                <div className={styles.styledDropdown}>
                    <div className={`${styles.input}`}>
                        <span className={styles.selectedItem}/>
                        <FaChevronDown className={`${styles.icon}`}/>
                    </div>
                </div>
            </div>
        )
    }

    if (items.length <= 0){
        return (
            <div className={`${styles.container} ${className}`} style={style} {...props}>
                {title && <div className={styles.title}>{title}</div>}
                <div className={styles.styledDropdown}>
                    <div className={`${styles.input}`}>
                        <span className={styles.selectedItem}>{'Список порожній'}</span>
                        <FaChevronDown className={`${styles.icon}`}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${className}`} style={style} {...props}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.styledDropdown}>
                <div className={`${styles.input} ${isOpen && styles.inputOpen}`}
                     onClick={() => setIsOpen(pref => !pref)}>
                    <span className={styles.selectedItem}>{selectedItem?.title || 'Выберите элемент'}</span>
                    <FaChevronDown className={`${styles.icon}`}/>
                </div>
                {isOpen && (
                    <ul className={styles.menu}>
                        {items.map((item, i) =>
                            <li className={styles.item} key={i} onClick={() => selectItem(item)}>{item?.title}</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default observer(SelectDropdown);
