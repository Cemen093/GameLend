import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import GameList from "../components/GameList";
import {Container} from "react-bootstrap";
import {getAllGamesConfirmedOrders, getAllGamesFromBasket, getAllGamesFromWishlist} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const BasketPage = ({isLoading = false}) => {
    const {userStore, dataStore} = useContext(Context)

    if (isLoading) {
        return (
            <div>Загрузка страницы пока не реализована</div>
        )
    }

    return (
        <Container fluid className="p-0 m-0 d-flex flex-column">
            <Container fluid className="px-3 mt-2 bg-almostBlack d-flex flex-column">
                {userStore.basketGames.count > 0 ?
                    <>
                        <GameList className="bg-almostBlack bg-item-grayBrown" games={userStore.basketGames.rows}
                                  buttons={{removeFromBasket: true, buy: true}}/>
                        <div className="my-3 align-self-end p-1 px-3 color-white d-flex">
                            Общая
                            сумма {userStore.basketGames.rows.reduce((sum, game) => sum + Number(game.price), 0)} ₴
                        </div>
                    </>
                    :
                    <div>Пустая корзина еще не реализована</div>
                }
            </Container>
            <Container className="mt-1 mb-2 bg-almostBlack d-flex justify-content-end">
                <div className="my-3 align-self-end p-1 px-3 bg-white d-flex">
                    Купить
                </div>
            </Container>
        </Container>
    );
};

export default observer(BasketPage);
