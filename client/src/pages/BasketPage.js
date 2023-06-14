import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ORDERING_ROUTE} from "../utils/consts";
import WhiteButton from "../components/buttons/WhiteButton";
import PageContent from "../components/pageContent/PageContent";
import GameList from "../components/gameList/GameList";

const BasketPage = () => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    return (
        <PageContent>
            <div className="bg-almostBlack">
                <GameList
                    games={userStore.basketGames}
                    loading={!userStore.init}
                    textEmpty="В кошику поки немає ігор"
                    buttons={{removeFromBasket: true, buy: true}}
                    className="bg-none px-4 py-2"
                    itemClassName="bg-grayBrown"
                />
                {userStore.init &&
                    <div className="d-flex justify-content-end color-white py-2 pe-3">
                        Спільна сумма {userStore.basketGames.reduce((sum, game) => sum + Number(game.price), 0)} ₴
                    </div>
                }
            </div>
            <div className="bg-almostBlack d-flex justify-content-end mt-2 py-4 pe-3">
                <WhiteButton onClick={() => navigate(ORDERING_ROUTE)}>Придбати</WhiteButton>
            </div>
        </PageContent>
    );
};

export default observer(BasketPage);
