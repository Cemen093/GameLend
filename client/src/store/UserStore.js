import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._user = {}
        makeAutoObservable(this)
    }

    setUser(user){
        this._user = user
    }

    get user() {
        return this._user
    }

    get isAuth() {
        return this._user !== null && typeof this._user === 'object' && Object.keys(this._user).length > 0
    }

    get isAdmin() {
        return this.isAuth && this._user?.role === 'ADMIN';
    }
}
