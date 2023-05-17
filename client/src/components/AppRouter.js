import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {adminRoutes, authorizedRoutes, publicRoutes, unauthorizedRoutes} from "../router";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer( () => {
    const {userStore} = useContext(Context)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!userStore.isAuth && unauthorizedRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {userStore.isAuth && authorizedRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {userStore.isAuth && userStore.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;
