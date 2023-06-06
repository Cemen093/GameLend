import {makeAutoObservable, runInAction} from "mobx";
import jwt_decode from "jwt-decode";
import {
    registration,
    login,
    checkAuth,
    updateUser,
    updateUserByAdmin,
    deleteUserByAdmin
} from "../http/userAPI";
import {
    addGameToBasket,
    fetchAllGamesFromBasket,
    removeAllGameFromBasket,
    removeGameFromBasket
} from "../http/basketAPI";
import {
    fetchAllGamesFromWishlist,
    addGameToWishlist,
    moveGameFromWishlistToBasket,
    removeGameFromWishlist
} from "../http/wishlistAPI";
import {
    fetchAllOrders,
    confirmPaymentOrder,
    createOrder,
    deleteOrder
} from "../http/orderAPI";

export default class UserStore {
    _user = {};
    _basketGames = [];
    _wishlistGames = [];
    _orders = [];
    _loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get user() {
        return this._user;
    }

    get basketGames() {
        return this._basketGames;
    }

    get wishlistGames() {
        return this._wishlistGames;
    }

    get boughtGames() {
        return this._wishlistGames
            .filter(item => item.isPaid)
            .flatMap(item => item.games);
    }

    get orders() {
        return this._orders;
    }

    get loading() {
        return this._loading;
    }

    get isAuth() {
        return this._user !== null && typeof this._user === 'object' && Object.keys(this._user).length > 0
    }

    get isAdmin() {
        return this.isAuth && this._user?.role === 'ADMIN';
    }

    async login(email, password) {
        try {
            runInAction(() => this._loading = true);

            const token = await login(email, password).then(data => data.token);
            localStorage.setItem('token', token);

            const user = jwt_decode(token)
            runInAction(() => this._user = user);
            await this.fetchUserData()
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при спробі авторизування:', error);
            this.logOut();
            this._loading = false;
        }
    }

    async registration(login, email, password) {
        try {
            runInAction(() => this._loading = true);

            const token = await registration(login, email, password).then(data => data.token);
            localStorage.setItem('token', token);

            const user = jwt_decode(token)
            runInAction(() => this._user = user);
            await this.fetchUserData()
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при спробі реестрації:', error);
            this.logOut();
            this._loading = false;
        }
    }

    async fetchUser() {
        try {
            runInAction(() => this._loading = true);

            const token = await checkAuth().then(data => data.token);
            localStorage.setItem('token', token);

            const user = jwt_decode(token)
            runInAction(() => this._user = user);
            await this.fetchUserData()
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при отриманні даних користувача:', error);
            this.logOut();
            this._loading = false;
        }
    }

    async fetchUserData() {
        try {
            runInAction(() => this._loading = true);

            const basketGames = await fetchAllGamesFromBasket().then(data => data.rows)
            const wishlistGames = await fetchAllGamesFromWishlist().then(data => data.rows)
            const orders = await fetchAllOrders().then(data => data.rows)

            runInAction(() => {
                this._basketGames = basketGames;
                this._wishlistGames = wishlistGames;
                this._orders = orders;
            });
        } catch (error) {
            console.error('Помилка при отриманні даних користувача:', error);
            this.logOut();
            this._loading = false;
        }
    }

    logOut() {
        runInAction(() => {
            this._user = {};
            this._basketGames = [];
            this._wishlistGames = [];
            this._orders = [];
        });
        localStorage.removeItem('token');
    }

    async updateUser({...props}) {
        try {
            runInAction(() => this._loading = true);

            const user = updateUser({...props})

            runInAction(() => {
                this._user = user;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при оновленні даних користувача:', error);
            this.logOut();
            this._loading = false;
        }
    }

    async updateUserByAdmin({email, user}) {
        try {
            runInAction(() => this._loading = true);

            const updatedUser = updateUserByAdmin({email, user})

            runInAction(() => {
                this._user = updatedUser;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при оновленні даних користувача:', error);
            this.logOut();
            this._loading = false;
        }
    }

    async deleteUserByAdmin(id) {
        try {
            runInAction(() => this._loading = true);

            const updatedUser = deleteUserByAdmin(id)

            runInAction(() => {
                this._user = updatedUser;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при оновленні даних користувача:', error);
            this.logOut();
            this._loading = false;
        }
    }

    async addGameToBasket(id) {
        try {
            runInAction(() => this._loading = true);

            const basketGames = await addGameToBasket(id).then(data => data.rows);

            runInAction(() => {
                this._basketGames = basketGames;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при спробі додати гру до корзини:', error);
            this._loading = false;
        }
    }

    async removeGameFromBasket(id) {
        try {
            runInAction(() => this._loading = true);

            const basketGames = await removeGameFromBasket(id).then(data => data.rows)

            runInAction(() => {
                this._basketGames = basketGames;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при спробі видалення гри з корзини:', error);
            this._loading = false;
        }
    }

    async addGameToWishlist(id) {
        try {
            runInAction(() => this._loading = true);

            const wishlistGames = await addGameToWishlist(id).then(data => data.rows)

            runInAction(() => {
                this._wishlistGames = wishlistGames;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при спробі додати гру до списку бажаного:', error);
            this._loading = false;
        }
    }

    async removeGameFromWishlist(id) {
        try {
            runInAction(() => this._loading = true);

            const wishlistGames = await removeGameFromWishlist(id).then(data => data.rows)

            runInAction(() => {
                this._wishlistGames = wishlistGames;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при спробі видалення гри з списку бажаного:', error);
            this._loading = false;
        }
    }

    async moveGameFromWishlistToBasket(id) {
        try {
            runInAction(() => this._loading = true);

            await moveGameFromWishlistToBasket(id).then(data => data.rows)
            const basketGames = await fetchAllGamesFromBasket().then(data => data.rows)
            const wishlistGames = await fetchAllGamesFromWishlist().then(data => data.rows)

            runInAction(() => {
                this._basketGames = basketGames;
                this._wishlistGames = wishlistGames;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при спробі перемистити гру з списка бажаного до корзини:', error);
            this._loading = false;
        }
    }

    async createOrder(items, isFromBasket) {
        try {
            runInAction(() => this._loading = true);

            const orders = await createOrder().then(data => data.rows)
            if (isFromBasket){
                await removeAllGameFromBasket();
            }

            runInAction(() => {
                this._orders = orders;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при створенні заказу:', error);
            this._loading = false;
        }
    }

    async confirmPaymentOrder(gameId) {
        try {
            runInAction(() => this._loading = true);

            await confirmPaymentOrder(gameId)

            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при підтвердженні заказу:', error);
            this._loading = false;
        }
    }

    async deleteOrder(id) {
        try {
            runInAction(() => this._loading = true);

            await deleteOrder(id)

            runInAction(() => {
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при видалені закаду:', error);
            this._loading = false;
        }
    }
}
