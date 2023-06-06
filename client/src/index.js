import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import UserStore from "./store/UserStore";
import GameStore from "./store/GameStore";
import SlidersStore from "./store/SlidersStore";
import PlatformsStore from "./store/PlatformsStore";
import SortTypesStore from "./store/SortTypesStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            userStore: new UserStore(),
            gameStore: new GameStore(),
            slidersStore: new SlidersStore(),
            platformsStore: new PlatformsStore(),
            sortTypesStore: new SortTypesStore(),
        }}
        >
            <App/>
        </Context.Provider>
    </React.StrictMode>
);
