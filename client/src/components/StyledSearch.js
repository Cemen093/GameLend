import React from 'react';
import {FaSearch} from "react-icons/fa";
import {observer} from "mobx-react-lite";
import search from '../styles/search.css'

const StyledSearch = ({searchText, setSearchText, onClick, className = '', placeholder, ...props}) => {
    return (
        <div className={'search-input ' + className}  {...props}>
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholder || "Поиск..."}
            />
            <FaSearch
                className="search-icon"
                onClick={onClick}
            />
        </div>
    );
};

export default observer(StyledSearch);
