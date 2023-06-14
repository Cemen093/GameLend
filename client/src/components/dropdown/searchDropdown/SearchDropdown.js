import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Dropdown} from 'react-bootstrap';
import {Context} from "../../../index";
import {GAME_ROUTE, SEARCH_ROUTE} from "../../../utils/consts";
import StyledSearch from "../../styledSearch/StyledSearch";
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
        console.log(query)
        navigate(`${SEARCH_ROUTE}?query=${query}`);
    };
    const handleBlur = () => {
        setIsOpen(false);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    const Item = ({item, loading}) => {
        if (loading) {
            return (
                <Dropdown.Item className={`${styles.itemContainer} ${styles.itemContainerSkeleton}`}
                               onMouseDown={handleMouseDown}>
                    <div className={`${styles.itemImage} ${styles.itemImageSkeleton}`}/>
                    <div className={`${styles.itemTitle} ${styles.itemTitleSkeleton}`}/>
                </Dropdown.Item>
            )
        }

        return (
            <Dropdown.Item
                className={styles.itemContainer}
                key={item.title}
                onMouseDown={handleMouseDown}
                onClick={() => handleDropdownItem(item.id)}
            >
                <img
                    className={styles.itemImage}
                    src={process.env.REACT_APP_API_URL + '/' + item.imgName} alt={item.title}
                />
                <div className={styles.itemTitle}>{item.title}</div>
            </Dropdown.Item>
        )
    }

    return (
        <div onBlur={handleBlur} className={`${styles.container} ${className}`}>
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
                            !gameStore.loading && gameStore.gamesNavbarSearch <= 0
                                ?
                                <div className={styles.textEmpty}>Нічого не знайдено</div>
                                :
                                (gameStore.loading ? [...Array(3)] : gameStore.gamesNavbarSearch)
                                    .map((item, i) => <Item key={i} item={item} loading={gameStore.loading}/>
                                )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </div>
    );
};

export default observer(SearchDropdown);
