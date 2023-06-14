import React, {useContext} from 'react';
import {Context} from "../index";
import {Container} from "react-bootstrap";
import GameList from "../components/gameList/GameList";
import {observer} from "mobx-react-lite";
import PageContent from "../components/pageContent/PageContent";

const WishlistPage = () => {
    const {userStore} = useContext(Context)

    return (
        <PageContent>
            <GameList
                games={userStore.wishlistGames}
                loading={!userStore.init}
                textEmpty="В списку бажаного поки нема ігор"
                buttons={{moveToBasket: true, removeFromWishlist: true, buy: true}}
                className="bg-none px-4 py-2"
                itemClassName="bg-almostBlack"
            />
        </PageContent>
    );
};

export default observer(WishlistPage);
