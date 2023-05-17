import React, {useContext} from 'react';
import {Context} from "../index";
import {Container} from "react-bootstrap";
import GameList from "../components/GameList";

const WishlistPage = () => {
    const {dataStore} = useContext(Context)

    return (
        <Container fluid className="px-3 my-2 bg-almostBlack d-flex flex-column">
            <GameList games={dataStore.games} className="no-wishlist bg-almostBlack bg-item-grayBrown"/>
            <div className="my-3 align-self-end p-1 px-3 color-white d-flex">
                Общая сумма {dataStore.games.reduce((sum, game) => sum + Number(game.price), 0)} ₴
            </div>
        </Container>
    );
};

export default WishlistPage;
