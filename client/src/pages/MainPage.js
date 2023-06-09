import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Slider from "../components/slider/Slider";
import PageContent from "../components/pageContent/PageContent";

const MainPage = () => {
    const {slidersStore} = useContext(Context)

    useEffect(() => {
        slidersStore.fetchGames();
    }, [slidersStore])

    return (
        <PageContent>
            <Slider loading={slidersStore.loading} items={slidersStore.gamesAllPlatform} className="mt-2"/>
            <div className="d-flex flex-row justify-content-around my-2">
                <Slider loading={slidersStore.loading} items={slidersStore.gamesPcPlatform} small={true} className=""/>
                <Slider loading={slidersStore.loading} items={slidersStore.gamesPlaystationPlatform} small={true} className="ms-4"/>
            </div>
        </PageContent>
    );
};

export default observer(MainPage);
