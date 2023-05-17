import {
    ACCOUNT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE,
    GAME_ROUTE, MAIN_ROUTE, ORDERING_ROUTE,
    SEARCH_ROUTE, WISHLIST_ROUTE
} from "./utils/consts";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import BasketPage from "./pages/BasketPage";
import WishlistPage from "./pages/WishlistPage";
import OrderingPage from "./pages/OrderingPage";
import AdminPage from "./pages/AdminPage";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path: GAME_ROUTE + '/:id',
        Component: GamePage
    },
    {
        path: ORDERING_ROUTE,
        Component: OrderingPage
    },
]
export const unauthorizedRoutes = [
]
export const authorizedRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: AccountPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },
    {
        path: WISHLIST_ROUTE,
        Component: WishlistPage
    },
]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
]
