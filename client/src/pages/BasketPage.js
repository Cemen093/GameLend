import React, {useContext} from 'react';
import {Context} from "../index";
import GameList from "../components/GameList";
import {Container} from "react-bootstrap";

const BasketPage = () => {
    const {dataStore} = useContext(Context)

    return (
        <Container fluid className="p-0 m-0 d-flex flex-column">
            <Container fluid className="px-3 mt-2 bg-almostBlack d-flex flex-column">
                <GameList games={dataStore.games} className="no-basket no-wishlist bg-almostBlack bg-item-grayBrown"/>
                <div className="my-3 align-self-end p-1 px-3 color-white d-flex">
                    Общая сумма {dataStore.games.reduce((sum, game) => sum + Number(game.price), 0)} ₴
                </div>
            </Container>
            <Container className="mt-1 mb-2 bg-almostBlack d-flex justify-content-end">
                <div className="my-3 align-self-end p-1 px-3 bg-white d-flex">
                    Купить
                </div>
            </Container>
        </Container>
    );
};

export default BasketPage;
