import React, {useContext} from 'react';
import {Context} from "../index";
import {Container} from "react-bootstrap";
import GameList from "../components/gameList/GameList";
import {observer} from "mobx-react-lite";

const WishlistPage = () => {
    const {userStore} = useContext(Context)

    return (
        <Container className="page-content">
            <GameList
                games={userStore.wishlistGames}
                loading={userStore.loading}
                textEmpty="В списку бажаного поки нема ігор"
                buttons={{moveToBasket: true, removeFromWishlist: true, buy: true}}
                className="bg-none px-4 py-2"
                itemClassName="bg-almostBlack"
            />
        </Container>
    );
};

export default observer(WishlistPage);
