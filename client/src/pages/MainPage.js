import React, {useContext, useEffect, useState} from 'react';
import Slider from "../components/Slider";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const MainPage = ({isLoading = false}) => {
    const {dataStore} = useContext(Context)

    if (isLoading){
        return <div>Main page loading</div>
    }

    return (
        <div>
            <Slider items={dataStore.gamesAllPlatform.rows} className="mt-2"/>
            <div className="d-flex flex-row justify-content-around my-2">
                <Slider items={dataStore.gamesPcPlatform.rows} className=" small"/>
                <Slider items={dataStore.gamesPlaystationPlatform.rows} className="ms-4 small"/>
            </div>
        </div>
    );
};

export default observer(MainPage);
