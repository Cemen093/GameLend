import {BrowserRouter as Router} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {
    checkAuth,
    getAllGamesConfirmedOrders,
    getAllGamesFromBasket,
    getAllGamesFromWishlist,
    getAllOrders
} from "./http/userAPI";
import {fetchGame, fetchGames} from "./http/gameAPI";
import {fetchPlatforms} from "./http/platformAPI";
import {fetchTypesSort} from "./http/typesSortAPI";
import {observer} from "mobx-react-lite";

const App = () => {
    const {userStore, dataStore} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                await checkAuth().then(user => userStore.setUser(user))
                await getAllGamesFromBasket().then(data => {userStore.setBasketGames(data)})
                await getAllGamesFromWishlist().then(data => {userStore.setWishlistGames(data)})
                await getAllGamesConfirmedOrders().then(data => {userStore.setBoughtGames(data)})
                await getAllOrders().then(data => userStore.setOrders(data))
            } catch (e) {
                console.error(e)
                userStore.logOut();
            }

            await fetchPlatforms().then(data => dataStore.setPlatforms(data))
            await fetchTypesSort().then(data => dataStore.setTypesSort(data))
            await fetchGames({limit: 8}).then(data => dataStore.setGamesAllPlatform(data))
            await fetchGames({platformsId: [1], limit: 6}).then(data => dataStore.setGamesPcPlatform(data))
            await fetchGames({platformsId: [2], limit: 6}).then(data => dataStore.setGamesPlaystationPlatform(data))
            await fetchGame(1).then(data => dataStore.setGame(data))
        }

        fetch().finally(() => setIsLoading(false)).catch(e => console.error(e.message))
    }, [])

    if (isLoading){
        return <Spinner animation="grow"/>
    }

  return (
      <Router>
        <Container className="d-flex flex-column min-vh-100">
          <NavBar/>
          <AppRouter/>
        </Container>
      </Router>
  );
}

export default observer(App);
