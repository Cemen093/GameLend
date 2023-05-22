import React, {useContext} from 'react';
import {Context} from "../index";
import {Container} from "react-bootstrap";
import GameList from "../components/GameList";
import {observer} from "mobx-react-lite";

const WishlistPage = ({isLoading = false}) => {
    const {userStore, dataStore} = useContext(Context)

    if (isLoading) {
        return (
            <div>Загрузка страницы пока не реализована</div>
        )
    }

    return (
        <Container fluid className="px-3 my-2 bg-almostBlack d-flex flex-column">
            {userStore.wishlistGames.count > 0 ?
                <GameList className="bg-almostBlack bg-item-grayBrown" games={userStore.wishlistGames.rows}
                          buttons={{moveToBasket: true, removeFromWishlist: true, buy: true}}
                />
                :
                <div>Пустой список желаемого еще не реализован</div>
            }
        </Container>
    );
};

export default observer(WishlistPage);
