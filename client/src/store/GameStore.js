import {makeAutoObservable, runInAction} from "mobx";
import {createGame, deleteGame, fetchGame, fetchGames, updateGame} from "../http/gameAPI";

export default class GameStore {
    _gamesNavbarSearch = []
    _gamesSearch =[]
    _game = {}
    _loadingCount = 0;
    constructor() {
        makeAutoObservable(this)
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
        return this._loadingCount > 0;
    }

    async createGame(game){
        try {
            runInAction(() => this._loadingCount++);
            await createGame(game)
            runInAction(() => this._loadingCount--);
        } catch (error) {
            console.error('Помилка при створенні нової ігри:', error);
            this._loadingCount--;
        }
    }

    async updateGame(game){
        try {
            runInAction(() => this._loadingCount++);
            await updateGame(game)
            runInAction(() => this._loadingCount--);
        } catch (error) {
            console.error('Помилка при створенні нової ігри:', error);
            this._loadingCount--;
        }
    }

    async fetchGamesNavbarSearch({...props}) {
        try {
            runInAction(() => this._loadingCount++);
            const gamesNavbarSearch = await fetchGames({...props}).then(data => data.rows);

            runInAction(() => {
                this._gamesNavbarSearch = gamesNavbarSearch;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні ігор пошуку навігаційного бару:', error);
            this._loadingCount--;
        }
    }

    async fetchGamesSearch({...props}) {
        try {
            runInAction(() => this._loadingCount++);
            const gamesSearch = await fetchGames({...props}).then(data => data.rows);

            runInAction(() => {
                this._gamesSearch = gamesSearch;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні ігор пошуку:', error);
            this._loadingCount--;
        }
    }

    async fetchGame(id) {
        try {
            runInAction(() => this._loadingCount++);
            const game = await fetchGame(id);

            runInAction(() => {
                this._game = game;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні ігри:', error);
            this._loadingCount--;
        }
    }

    async deleteGame(id){
        try {
            runInAction(() => this._loadingCount++);
            await deleteGame(id)
            runInAction(() => this._loadingCount--);
        } catch (error) {
            console.error('Помилка при створенні нової ігри:', error);
            this._loadingCount--;
        }
    }
}
