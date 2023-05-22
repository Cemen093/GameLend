import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._user = {}
        this._basketGames = []
        this._wishlistGames = []
        this._boughtGames = []
        this._orders = []
        makeAutoObservable(this)
    }

    setUser(user){
        this._user = user
    }

    setBasketGames(value) {
        this._basketGames = value;
    }

    setWishlistGames(value) {
        this._wishlistGames = value;
    }

    setBoughtGames(value) {
        this._boughtGames = value;
    }

    setOrders(value) {
        this._orders = value;
    }

    get user() {
        return this._user
    }

    get basketGames() {
        return this._basketGames;
    }

    get wishlistGames() {
        return this._wishlistGames;
    }

    get boughtGames() {
        return this._boughtGames;
    }

    get orders() {
        return this._orders;
    }

    get isAuth() {
        return this._user !== null && typeof this._user === 'object' && Object.keys(this._user).length > 0
    }

    get isAdmin() {
        return this.isAuth && this._user?.role === 'ADMIN';
    }
}
