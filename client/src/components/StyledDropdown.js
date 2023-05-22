import React, {useEffect, useState} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import "../styles/dropdown.css";
import {observer} from "mobx-react-lite";

const StyledDropdown = ({title, selectedItem, setSelectedItem, items, className = '', ...props}) => {
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
        <div className={'styled-dropdown-container ' + className} {...props}>
            <div className="styled-dropdown-title">{title}</div>
            <div className="styled-dropdown">
                <div className={`styled-dropdown-input ${isOpen ? 'open' : ''}`}
                     onClick={() => setIsOpen(pref => !pref)}>
                    <span className="selected-item">{selectedItem?.title || 'Выберите элемент'}</span>
                    <FaChevronDown className="arrow-icon styled-dropdown-arrow"/>
                </div>
                {isOpen && (
                    <ul className="styled-dropdown-menu">
                        {items.map((item, i) =>
                            <li key={i} onClick={() => selectItem(item)}>{item?.title}</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default observer(StyledDropdown);
