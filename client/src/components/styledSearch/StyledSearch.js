import React from 'react';
import {FaSearch} from "react-icons/fa";
import {observer} from "mobx-react-lite";
import styles from './styledSearch.module.css'

const StyledSearch = ({searchText, setSearchText, onClick, placeholder, className = '', style = {}, ...props}) => {

    return (
        <div className={`${styles.container} ${className}`} style={style} {...props}>
            <input
                className={styles.input}
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholder || "Поиск..."}
            />
            <FaSearch
                className={styles.searchIcon}
                onClick={onClick}
            />
        </div>
    );
};

export default observer(StyledSearch);
