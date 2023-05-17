import {BrowserRouter as Router} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import userImg from './assets/profile.jpg'

const App = () => {
    const {userStore} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userStore.setUser({id: 1, login: 'login', email: 'email@mail.com', img: userImg})
        setIsLoading(false);
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

export default App;
