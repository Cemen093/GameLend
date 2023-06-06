import {makeAutoObservable, runInAction} from 'mobx';
import {fetchRandomGames} from "../http/gameAPI";

export default class DataStore {
    _gamesAllPlatform = [];
    _gamesPcPlatform = [];
    _gamesPlaystationPlatform = []
    _loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchGames() {
        try {
            runInAction(() => {
                this._loading = true;
            });

            const allPlatformGames = await fetchRandomGames({ platformsId: [1, 2], limit: 10 });
            const pcPlatformGames = await fetchRandomGames({ platformsId: [1], limit: 6 });
            const playstationPlatformGames = await fetchRandomGames({ platformsId: [2], limit: 6 });

            runInAction(() => {
                this._gamesAllPlatform = allPlatformGames;
                this._gamesPcPlatform = pcPlatformGames;
                this._gamesPlaystationPlatform = playstationPlatformGames;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні списку ігор:', error);
            this._loading = false;
        }
    }

    get gamesAllPlatform() {
        return this._gamesAllPlatform;
    }

    get gamesPcPlatform() {
        return this._gamesPcPlatform;
    }

    get gamesPlaystationPlatform() {
        return this._gamesPlaystationPlatform;
    }

    get loading() {
        return this._loading;
    }
}
