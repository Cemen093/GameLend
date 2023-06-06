import React, {useContext, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import StyledDropdown from "../components/StyledDropdown";
import StyledSearch from "../components/StyledSearch";
import GameList from "../components/gameList/GameList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {SEARCH_ROUTE} from "../utils/consts";

const getPlatform = (platforms) => {
    const allPlatformIds = platforms.map(platform => platform.id);
    const allPlatforms = {title: 'All', ids: allPlatformIds};
    return [allPlatforms, ...platforms.map(platform => ({
        title: platform.title,
        ids: [platform.id],
    }))];
}

const SearchPage = () => {
    const {gameStore, platformsStore, sortTypesStore} = useContext(Context);
    const platforms = getPlatform(platformsStore.platforms);
    const location = useLocation();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
    const [selectedSort, setSelectedSort] = useState(sortTypesStore.typeSorts[0]);
    const isDataInitialized = useRef(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        if (query) {
            setSearchQuery(query);
            navigate(SEARCH_ROUTE);
        }
    }, [location])


    useEffect(() => {
        if (isDataInitialized.current) {
            gameStore.fetchGamesSearch({
                title: searchQuery, platformsId: selectedPlatform.ids,
                typeSortId: selectedSort.id
            })
        } else {
            isDataInitialized.current = true;
        }
    }, [searchQuery, selectedPlatform, selectedSort]);

    return (
        <Container className="page-content">
            <div className="d-flex flex-row align-items-center py-2 mx-4 px-4 bg-almostBlack color-white">
                <StyledSearch
                    searchText={searchQuery}
                    setSearchText={setSearchQuery}
                    className="width-grow"
                />

                <StyledDropdown
                    title="Платформа"
                    selectedItem={selectedPlatform}
                    setSelectedItem={setSelectedPlatform}
                    items={platforms}
                    className="ms-2"
                />
                <StyledDropdown
                    title="Сортировка"
                    selectedItem={selectedSort}
                    setSelectedItem={setSelectedSort}
                    items={sortTypesStore.typeSorts}
                    className="ms-2"
                />
            </div>
            <GameList
                games={gameStore.gamesSearch}
                loading={gameStore.loading}
                textEmpty="За вашим запитом нічого не знайденно"
                buttons={{addToBasket: true, addToWishlist: true, buy: true}}
                className="px-4"
                itemClassName=" "
            />
        </Container>
    );
};

export default observer(SearchPage);
