import React, {useContext, useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import StyledSearch from "./StyledSearch";
import {GAME_ROUTE, SEARCH_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {fetchGames} from "../http/gameAPI";
import {Context} from "../index";

const SearchDropdown = ({className = ''}) => {
    const navigate = useNavigate();
    const {dataStore} = useContext(Context);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            await fetchGames({title: searchText, page: 1, limit: 5})
                .then(data => {dataStore.setGamesNavbarSearch(data)}).catch(e => console.error(e.message))
        }

        fetch()
        setIsOpen(searchText !== '');
    }, [searchText])


    const handleDropdownItem = (id) => {
        navigate(GAME_ROUTE + '/' + id)
    }
    const handleSearch = (query) => {
        navigate(`${SEARCH_ROUTE}?query=${query}`);
    };
    const handleBlur = () => {
        setIsOpen(false);
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <div onBlur={handleBlur} className={' ' + className}>
            <StyledSearch
                searchText={searchText}
                setSearchText={setSearchText}
                onClick={() => handleSearch(searchText)}
            />
            {isOpen && (
                <Dropdown
                    show={isOpen}
                    style={{marginTop: '5px'}}
                    onMouseDown={handleMouseDown}
                >
                    <Dropdown.Menu>
                        {dataStore.gamesNavbarSearch.rows.map(item => (
                            <Dropdown.Item
                                key={item.title}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                }}
                                onClick={() => {
                                    handleDropdownItem(item.id)
                                    handleBlur()
                                }}>
                                <img src={process.env.REACT_APP_API_URL + '/' + item.img} alt={item.title} style={{width: '70px', marginRight: '5px'}}/>
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
