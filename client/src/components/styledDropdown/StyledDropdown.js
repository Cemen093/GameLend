import React, {useEffect, useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import styles from "./styledDropdown.module.css";
import {observer} from "mobx-react-lite";

const StyledDropdown = ({title, selectedItem, setSelectedItem, items, className = '', style = {}, ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotEmpty, setIsNotEmpty] = useState(false);

    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    useEffect(() => {
        const notEmpty = items && items.length > 0;
        setIsNotEmpty(notEmpty)
        const init = async () => {
            if (notEmpty) {
                setSelectedItem(items[0]);
            }
        }

        init().finally(() => setIsLoading(false));
    }, [])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (!isNotEmpty){
        return <div>Пустой список пока не реализован</div>
    }

    return (
        <div className={`${styles.container} ${className}`} style={style} {...props}>
            <div className={styles.title}>{title}</div>
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

export default observer(StyledDropdown);
