import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button, Container, Form, FormControl} from "react-bootstrap";
import StyledDropdown from "../components/StyledDropdown";
import StyledSearch from "../components/StyledSearch";
import GameList from "../components/GameList";
import {Context} from "../index";

const SearchPage = observer(() => {
    const {dataStore} = useContext(Context);
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState(dataStore.platforms[0]);
    const [sort, setSort] = useState(dataStore.sort[0]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        setSearchQuery(query);
    }, [location])

    return (
        <Container fluid className="p-0 my-2">
            <div className="d-flex flex-row align-items-center p-2 bg-almostBlack color-white">
                <StyledSearch
                    searchText={searchQuery}
                    setSearchText={setSearchQuery}
                    onClick={() => {
                        alert("hello")
                    }}
                    className="width-grow"
                />

                <StyledDropdown
                    title="Платформа"
                    selectedItem={selectedPlatform}
                    setSelectedItem={setSelectedPlatform}
                    items={dataStore.platforms}
                    className="ms-2"
                />
                <StyledDropdown
                    title="Сортировка"
                    selectedItem={sort}
                    setSelectedItem={setSort}
                    items={dataStore.sort}
                    className="ms-2"
                />
            </div>
            <div>
                <GameList games={dataStore.games} className="no-wastebasket"/>
            </div>
        </Container>
    );
});

export default SearchPage;
