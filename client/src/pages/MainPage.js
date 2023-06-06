import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import Slider from "../components/slider/Slider";

const MainPage = () => {
    const {slidersStore} = useContext(Context)

    useEffect(() => {
        slidersStore.fetchGames();
    }, [slidersStore])

    return (
        <Container className="page-content">
            <Slider loading={slidersStore.loading} items={slidersStore.gamesAllPlatform} className="mt-2"/>
            <div className="d-flex flex-row justify-content-around my-2">
                <Slider loading={slidersStore.loading} items={slidersStore.gamesPcPlatform} small={true} className=""/>
                <Slider loading={slidersStore.loading} items={slidersStore.gamesPlaystationPlatform} small={true} className="ms-4"/>
            </div>
        </Container>
    );
};

export default observer(MainPage);
