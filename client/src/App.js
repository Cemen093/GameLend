import {BrowserRouter as Router} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {checkAuth, getAllGamesConfirmedOrders, getAllGamesFromBasket, getAllGamesFromWishlist} from "./http/userAPI";
import {fetchGame, fetchGames} from "./http/gameAPI";
import {fetchPlatforms} from "./http/platformAPI";
import {fetchTypesSort} from "./http/typesSortAPI";
import {observer} from "mobx-react-lite";

const updateDataPlatform = (data) => {
    const platforms = data.rows;
    const allPlatformIds = platforms.map(platform => platform.id);
    const allPlatforms = { title: 'All', ids: allPlatformIds };
    return {count: data.count + 1, rows: [allPlatforms, ...platforms.map(platform => ({
        title: platform.title,
        ids: [platform.id],
    }))]};
}

const App = () => {
    const {userStore, dataStore} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isAuthenticated = false;
        const fetch = async () => {
            await checkAuth()
                .then(user => {userStore.setUser(user);isAuthenticated = true;}).catch(e => {userStore.setUser({})})
            if (isAuthenticated) {
                await getAllGamesFromBasket().then(data => {userStore.setBasketGames(data)})
                await getAllGamesFromWishlist().then(data => {userStore.setWishlistGames(data)})
                await getAllGamesConfirmedOrders().then(data => {userStore.setBoughtGames(data)})
            }
            await fetchPlatforms().then(data => dataStore.setPlatforms(updateDataPlatform(data)))
            await fetchTypesSort().then(data => dataStore.setTypesSort(data))
            await fetchGames({limit: 8}).then(data => dataStore.setGamesAllPlatform(data))
            await fetchGames({platformsId: [1], limit: 6}).then(data => dataStore.setGamesPcPlatform(data))
            await fetchGames({platformsId: [2], limit: 6}).then(data => dataStore.setGamesPlaystationPlatform(data))
            await fetchGame(1).then(data => dataStore.setGame(data))
            setIsLoading(false)
        }

        fetch().catch(e => console.error(e.message))
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
