import React, {useContext, useEffect, useState} from 'react';
import Slider from "../components/Slider";
import {Context} from "../index";

const MainPage = ({isLoading = false}) => {
    const {dataStore} = useContext(Context)

    if (isLoading){
        return <div>Main page loading</div>
    }

    return (
        <div>
            <Slider items={dataStore.gamesAllPlatform.rows} className="mt-2"/>
            <div className="d-flex flex-row justify-content-around small my-2">
                <Slider items={dataStore.gamesPcPlatform.rows} className=""/>
                <Slider items={dataStore.gamesPlaystationPlatform.rows} className="ms-5"/>
            </div>
        </div>
    );
};

export default MainPage;
