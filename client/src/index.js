import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import UserStore from "./store/UserStore";
import DataStore from "./store/DataStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            userStore: new UserStore(),
            dataStore: new DataStore(),
        }}
        >
            <App/>
        </Context.Provider>
    </React.StrictMode>
);
