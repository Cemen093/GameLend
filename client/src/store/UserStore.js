import {makeAutoObservable, runInAction} from "mobx";
import jwt_decode from "jwt-decode";
import {checkAuth, deleteUserByAdmin, login, registration, updateUser, updateUserByAdmin} from "../http/userAPI";
import {
    addGameToBasket,
    fetchAllGamesFromBasket,
    removeAllGameFromBasket,
    removeGameFromBasket
} from "../http/basketAPI";
import {
    addGameToWishlist,
    fetchAllGamesFromWishlist,
    moveGameFromWishlistToBasket,
    removeGameFromWishlist
} from "../http/wishlistAPI";
import {createOrder, fetchAllUserOrders} from "../http/orderAPI";

export default class UserStore {
    _user = {};
    _basketGames = [];
    _wishlistGames = [];
    _orders = [];
    _loadingCount = 0;
    _init = false;

    constructor() {
        makeAutoObservable(this)
    }

    async login(email, password) {
        try {
            runInAction(() => this._loadingCount++);

            const token = await login(email, password).then(data => data.token);
            localStorage.setItem('token', token);

            const user = jwt_decode(token)
            runInAction(() => this._user = user);

            await Promise.all([
                this.fetchUserBasketGames(),
                this.fetchUserWishlistGames(),
                this.fetchUserOrders()
            ])

            runInAction(() => this._loadingCount--);
        } catch (error) {
            console.error('Помилка при спробі авторизування:', error);
            this.logOut();
            this._loadingCount--;
        }
    }

    async registration(login, email, password) {
        try {
            runInAction(() => this._loadingCount++);

            const token = await registration(login, email, password).then(data => data.token);
            localStorage.setItem('token', token);

            const user = jwt_decode(token)
            runInAction(() => this._user = user);

            await Promise.all([
                this.fetchUserBasketGames(),
                this.fetchUserWishlistGames(),
                this.fetchUserOrders()
            ])

            runInAction(() => this._loadingCount--);
        } catch (error) {
            console.error('Помилка при спробі реестрації:', error);
            this.logOut();
            this._loadingCount--;
        }
    }

    async fetchUser() {
        try {
            runInAction(() => this._loadingCount++);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const token = await checkAuth().then(data => data.token);
            localStorage.setItem('token', token);

            const user = jwt_decode(token)
            runInAction(() => this._user = user);

            await Promise.all([
                this.fetchUserBasketGames(),
                this.fetchUserWishlistGames(),
                this.fetchUserOrders()
            ])

            runInAction(() => {
                this._loadingCount--;
                this._init = true;
            });
        } catch (error) {
            console.error('Помилка при отриманні даних користувача:', error);
            this.logOut();
            this._loadingCount--;
            this._init = true;
        }
    }

    async fetchUserBasketGames() {
        try {
            runInAction(() => this._loadingCount++);
            const basketGames = await fetchAllGamesFromBasket().then(data => data.rows)

            runInAction(() => {
                this._basketGames = basketGames;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні заказів корістувача:', error);
            this.logOut();
            this._loadingCount--;
        }
    }

    async fetchUserWishlistGames() {
        try {
            runInAction(() => this._loadingCount++);
            const wishlistGames = await fetchAllGamesFromWishlist().then(data => data.rows)

            runInAction(() => {
                this._wishlistGames = wishlistGames;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні списка бажаного користувача:', error);
            this.logOut();
            this._loadingCount--;
        }
    }

    async fetchUserOrders() {
        try {
            runInAction(() => this._loadingCount++);
            const orders = await fetchAllUserOrders().then(data => data.rows)
            runInAction(() => {
                this._orders = orders;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні заказів користувача:', error);
            this.logOut();
            this._loadingCount--;
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
            runInAction(() => this._loadingCount++);

            const user = await updateUser({...props})

            runInAction(() => {
                this._user = user;
                this._loadingCount--;
            });
            return true
        } catch (error) {
            console.error('Помилка при оновленні даних користувача:', error);
            this._loadingCount--;
        }
        return false
    }

    async updateUserByAdmin(data) {
        const {email, ...user} = data;
        try {
            runInAction(() => this._loadingCount++);

            const res = await updateUserByAdmin({email, user})

            runInAction(() => {
                this._loadingCount--;
            });
            // return res;
        } catch (error) {
            console.error('Помилка при оновленні даних користувача:', error);
            this._loadingCount--;
            // return {...error.message}
            return false
        }
        return true
    }

    async deleteUserByAdmin(id) {
        try {
            runInAction(() => this._loadingCount++);

            const res = await deleteUserByAdmin(id)

            runInAction(() => {
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при оновленні даних користувача:', error);
            this._loadingCount--;
        }
    }

    async addGameToBasket(id) {
        try {
            runInAction(() => this._loadingCount++);

            await addGameToBasket(id).then(data => data.rows);
            this.fetchUserBasketGames()

            runInAction(() => {
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при спробі додати гру до корзини:', error);
            this._loadingCount--;
        }
    }

    async removeGameFromBasket(id) {
        try {
            runInAction(() => this._loadingCount++);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await removeGameFromBasket(id)
            this.fetchUserBasketGames()

            runInAction(() => {
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при спробі видалення гри з корзини:', error);
            this._loadingCount--;
        }
    }

    async addGameToWishlist(id) {
        try {
            runInAction(() => this._loadingCount++);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await addGameToWishlist(id).then(data => data.rows)
            this.fetchUserWishlistGames()

            runInAction(() => {
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при спробі додати гру до списку бажаного:', error);
            this._loadingCount--;
        }
    }

    async removeGameFromWishlist(id) {
        try {
            runInAction(() => this._loadingCount++);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await removeGameFromWishlist(id).then(data => data.rows)
            this.fetchUserWishlistGames()

            runInAction(() => {
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при спробі видалення гри з списку бажаного:', error);
            this._loadingCount--;
        }
    }

    async moveGameFromWishlistToBasket(id) {
        try {
            runInAction(() => this._loadingCount++);

            await moveGameFromWishlistToBasket(id).then(data => data.rows)
            this.fetchUserBasketGames()
            this.fetchUserWishlistGames()

            runInAction(() => {
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при спробі перемистити гру з списка бажаного до корзини:', error);
            this._loadingCount--;
        }
    }

    async createOrder({isFromBasket, ...props}) {
        try {
            runInAction(() => this._loadingCount++);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await createOrder({...props}).then(data => data.rows)

            if (isFromBasket){
                removeAllGameFromBasket();
            }
            this.fetchUserOrders()
            this.fetchUserBasketGames()

            runInAction(() => {
                this._loadingCount--;
            });
            return true
        } catch (error) {
            console.error('Помилка при створенні заказу:', error);
            this._loadingCount--;
            return false
        }
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

    get orders() {
        return this._orders;
    }

    get orderGames() {
        return this._orders?.flatMap(order =>
            order?.order_items?.flatMap(item =>
                Array.from({ length: item.quantity }, () => ({
                    ...item.game,
                    price: item.price,
                    isPaid: order.isPaid,
                    buyAt: order.createdAt
                }))
            )
        ) || []

    }

    get boughtOrderGames() {
        return this.orderGames
            ?.filter(item => item.isPaid) || []

    }

    get loading() {
        return this._loadingCount > 0 || !this._init;
    }

    get isAuth() {
        return this._user !== null && typeof this._user === 'object' && Object.keys(this._user).length > 0
    }

    get isAdmin() {
        return this.isAuth && this._user?.role === 'ADMIN';
    }

    get init() {
        return this._init;
    }
}
