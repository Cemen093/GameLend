import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import StyledDropdown from "../components/StyledDropdown";
import StyledSearch from "../components/StyledSearch";
import GameList from "../components/GameList";
import {Context} from "../index";
import {fetchGames} from "../http/gameAPI";

const SearchPage = () => {
    const {dataStore} = useContext(Context);
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        setSearchQuery(query);
    }, [location])

    useEffect(() => {
        const init = async () => {
            setSelectedPlatform(dataStore.platforms[0])
            setSelectedSort(dataStore.typesSort[0])
            await fetchGames({})
                .then(data => dataStore.setGamesSearch(data)).catch(e => console.error(e.message));
            setIsLoading(false);
        }
        const fetchUpdate = async (...props) => {
            await fetchGames(...props).then(data => dataStore.setGamesSearch(data)).catch(e => console.error(e.message))
        }

        if (isLoading) {
            init();
        } else {
            fetchUpdate({
                title: searchQuery,
                platformsId: selectedPlatform.ids,
                typeSortId: selectedSort.id,
                page: page,
            })
        }
    }, [searchQuery, selectedPlatform, selectedSort, page])

    if (isLoading){
        return <Spinner/>
    }

    //TODO пагинация

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
                    items={dataStore.platforms.rows}
                    className="ms-2"
                />
                <StyledDropdown
                    title="Сортировка"
                    selectedItem={selectedSort}
                    setSelectedItem={setSelectedSort}
                    items={dataStore.typesSort.rows}
                    className="ms-2"
                />
            </div>
            <div>
                <GameList games={dataStore.gamesSearch.rows} isLoading={isLoading}
                buttons={{addToBasket: true, addToWishlist: true, buy: true}}/>
            </div>
        </Container>
    );
};

export default SearchPage;
