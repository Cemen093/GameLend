import React, {useContext} from 'react';
import {Context} from "../index";
import Slider from "../components/Slider";

const MainPage = () => {
    const {dataStore} = useContext(Context)

    return (
        <div>
            <Slider items={dataStore.games} className="mt-2"/>
            <div className="d-flex flex-row justify-content-around small my-2">
                <Slider items={dataStore.games} className=""/>
                <Slider items={dataStore.games} className="ms-5"/>
            </div>
        </div>
    );
};

export default MainPage;
