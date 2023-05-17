import React, {useEffect, useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import colors from '../utils/colors'
import dropdown from "../styles/dropdown.css";
import {observer} from "mobx-react-lite";

const StyledDropdown = observer(({title, selectedItem, setSelectedItem, items, className = '', ...props}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectItem = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    useEffect(() => {
        const menuItems = document.querySelectorAll('.styled-dropdown-menu li');
        let maxWidth = 0;
        menuItems.forEach((item) => {
            const width = item.getBoundingClientRect().width;
            maxWidth = Math.max(maxWidth, width);
        });
        document.documentElement.style.setProperty('--max-dropdown-width', `${maxWidth}px`);

    }, [])

    return (
        <div className={'styled-dropdown-container ' + className} {...props}>
            <div className="styled-dropdown-title">{title}</div>
            <div className="styled-dropdown">
                <div className={`styled-dropdown-input ${isOpen ? 'open' : ''}`}
                     onClick={() => setIsOpen(pref => !pref)}>
                    <span className="selected-item">{selectedItem || 'Выберите элемент'}</span>
                    <FaChevronDown className="arrow-icon styled-dropdown-arrow"/>
                </div>
                {isOpen && (
                    <ul className="styled-dropdown-menu">
                        {items.map((item, i) =>
                            <li key={i} onClick={() => selectItem(item)}>{item}</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
});

export default StyledDropdown;
