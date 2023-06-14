import React, {useContext, useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router-dom";
import StyledSearch from "../components/styledSearch/StyledSearch";
import GameList from "../components/gameList/GameList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import PageContent from "../components/pageContent/PageContent";
import SelectDropdown from "../components/dropdown/selectDropdown/SelectDropdown";

const SearchPage = () => {
    const {gameStore, platformsStore, sortTypesStore} = useContext(Context);
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const isDataInitialized = useRef(false);

    useEffect(() => {
        setSearchQuery(new URLSearchParams(location.search).get('query') || '');
    }, [location])


    useEffect(() => {
        if (selectedPlatform !== null && selectedSort !== null) {
            gameStore.fetchGamesSearch({
                title: searchQuery, platformsId: selectedPlatform.ids,
                typeSortId: selectedSort.id
            })
        }
    }, [searchQuery, selectedPlatform, selectedSort]);

    return (
        <PageContent>
            <div className="d-flex flex-row align-items-center py-2 mx-4 px-4 bg-almostBlack color-white">
                <StyledSearch
                    searchText={searchQuery}
                    setSearchText={setSearchQuery}
                    className="width-grow"
                    style={{width: "100%"}}
                />

                <SelectDropdown
                    title="Платформа"
                    selectedItem={selectedPlatform}
                    setSelectedItem={setSelectedPlatform}
                    items={platformsStore.platformsWithAll}
                    loading={platformsStore.loading}
                    className="ms-2"
                />
                <SelectDropdown
                    title="Сортировка"
                    selectedItem={selectedSort}
                    setSelectedItem={setSelectedSort}
                    items={sortTypesStore.sortTypes}
                    loading={sortTypesStore.loading}
                    className="ms-2"
                />
            </div>
            <GameList
                games={gameStore.gamesSearch}
                loading={gameStore.loading || platformsStore.loading || sortTypesStore.loading}
                textEmpty="За вашим запитом нічого не знайденно"
                buttons={{addToBasket: true, addToWishlist: true, buy: true}}
                className="px-4"
                itemClassName=" "
            />
        </PageContent>
    );
};

export default observer(SearchPage);
