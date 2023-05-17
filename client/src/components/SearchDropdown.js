import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import StyledSearch from "./StyledSearch";

const SearchDropdown = ({items, ItemOnClick, IconOnClick, className = ''}) => {
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setFilteredItems(items.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
        ).slice(0, 5));
        setIsOpen(searchText !== '');
    }, [searchText]);

    if (items === undefined) {
        return <></>
    }
    const handleBlur = () => {
        setIsOpen(false);
    };

    const handleMouseDown = (event) => {
        event.preventDefault(); // Предотвратить потерю фокуса из-за события mousedown
    };

    return (
        <div onBlur={handleBlur} className={' ' + className}>
            <StyledSearch
                searchText={searchText}
                setSearchText={setSearchText}
                onClick={() => IconOnClick(searchText)}
            />
            {isOpen && (
                <Dropdown
                    show={isOpen}
                    style={{marginTop: '5px'}}
                    onMouseDown={handleMouseDown} // Добавить обработчик события onMouseDown
                >
                    <Dropdown.Menu>
                        {filteredItems.map(item => (
                            <Dropdown.Item
                                key={item.title}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                }}
                                onClick={() => {
                                    ItemOnClick(item.id)
                                    handleBlur()
                                }}>
                                <img src={item.img} alt={item.title} style={{width: '70px', marginRight: '5px'}}/>
                                {item.title}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </div>
    );
};

export default observer(SearchDropdown);
