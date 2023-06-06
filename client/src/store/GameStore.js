import {makeAutoObservable, runInAction} from "mobx";
import {createGame, deleteGame, fetchGame, fetchGames, updateGame} from "../http/gameAPI";

export default class GameStore {
    _gamesNavbarSearch = []
    _gamesSearch =[]
    _game = {}
    _loading = true;
    constructor() {
        makeAutoObservable(this)
    }

    async createGame(game){
        try {
            runInAction(() => this._loading = true);
            await createGame(game)
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при створенні нової ігри:', error);
            this._loading = false;
        }
    }

    async updateGame(game){
        try {
            runInAction(() => this._loading = true);
            await updateGame(game)
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при створенні нової ігри:', error);
            this._loading = false;
        }
    }

    async fetchGamesNavbarSearch({...props}) {
        try {
            runInAction(() => this._loading = true);
            const gamesNavbarSearch = await fetchGames({...props}).then(data => data.rows);

            runInAction(() => {
                this._gamesNavbarSearch = gamesNavbarSearch;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні ігор пошуку навігаційного бару:', error);
            this._loading = false;
        }
    }

    async fetchGamesSearch({...props}) {
        try {
            runInAction(() => this._loading = true);
            const gamesSearch = await fetchGames({...props}).then(data => data.rows);

            runInAction(() => {
                this._gamesSearch = gamesSearch;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні ігор пошуку:', error);
            this._loading = false;
        }
    }

    async fetchGame(id) {
        try {
            runInAction(() => this._loading = true);
            const game = await fetchGame(id);

            runInAction(() => {
                this._game = game;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні ігри:', error);
            this._loading = false;
        }
    }

    async deleteGame(id){
        try {
            runInAction(() => this._loading = true);
            await deleteGame(id)
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при створенні нової ігри:', error);
            this._loading = false;
        }
    }


    get gamesNavbarSearch() {
        return this._gamesNavbarSearch;
    }

    get gamesSearch() {
        return this._gamesSearch;
    }

    get game() {
        return this._game;
    }

    get loading() {
        return this._loading;
    }
}
