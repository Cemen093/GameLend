import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Dropdown} from 'react-bootstrap';
import {Context} from "../../index";
import {GAME_ROUTE, SEARCH_ROUTE} from "../../utils/consts";
import StyledSearch from "../styledSearch/StyledSearch";
import {observer} from "mobx-react-lite";
import styles from "./searchDropdown.module.css"

const SearchDropdown = ({className = ''}) => {
    const {gameStore} = useContext(Context);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        gameStore.fetchGamesNavbarSearch({title: searchText, page: 1, limit: 5})
        setIsOpen(searchText !== '');
    }, [searchText])


    const handleDropdownItem = (id) => {
        navigate(GAME_ROUTE + '/' + id)
        handleBlur()
    }
    const handleSearch = (query) => {
        navigate(`${SEARCH_ROUTE}?query=${query}`);
    };
    const handleBlur = () => {
        setSearchText('')
        setIsOpen(false);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <div onBlur={handleBlur} className={`${styles.searchDropdown} ${className}`}>
            <StyledSearch
                searchText={searchText}
                setSearchText={setSearchText}
                onClick={() => handleSearch(searchText)}
            />
            {isOpen && (
                <Dropdown
                    className={styles.dropdown}
                    show={isOpen}
                    onMouseDown={handleMouseDown}
                >
                    <Dropdown.Menu className={styles.menu}>
                        {
                            gameStore.loading
                                ?
                                <div></div>
                                :
                            gameStore.gamesNavbarSearch.length > 0
                                ?
                                gameStore.gamesNavbarSearch.map(item => (
                                    <Dropdown.Item
                                        className={styles.item}
                                        key={item.title}
                                        onMouseDown={handleMouseDown}
                                        onClick={() => handleDropdownItem(item.id)}
                                    >
                                        <img
                                            className={styles.image}
                                             src={process.env.REACT_APP_API_URL + '/' + item.imgName} alt={item.title}
                                        />
                                        <div className={styles.title}>{item.title}</div>
                                    </Dropdown.Item>
                                ))
                                :
                                <div className={styles.notFound}>Нічого не знайдено</div>
                        }
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </div>
    );
};

export default observer(SearchDropdown);
