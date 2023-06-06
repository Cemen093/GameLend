import {BrowserRouter as Router} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import NavBar from "./components/header/Header";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import Footer from "./components/footer/Footer";
import {observer} from "mobx-react-lite";

const App = () => {
    const {userStore, platformsStore, sortTypesStore} = useContext(Context)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await userStore.fetchUser();
            await platformsStore.fetchPlatforms();
            await sortTypesStore.fetchSortTypes();
            setLoading(false);
        }

        init();
    }, [])

    if (loading) {
        return <div></div>;
    }

    return (
        <Router>
            <Container className="d-flex flex-column min-vh-100">
                <NavBar/>
                <AppRouter/>
                <Footer/>
            </Container>
        </Router>
    );
}

export default App;
