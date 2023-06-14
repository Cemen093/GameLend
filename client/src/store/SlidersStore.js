import {makeAutoObservable, runInAction} from 'mobx';
import {fetchRandomGames} from "../http/gameAPI";

export default class DataStore {
    _gamesAllPlatform = [];
    _gamesPcPlatform = [];
    _gamesPlaystationPlatform = []
    _loadingCount = 0;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchGames() {
        try {
            runInAction(() => {
                this._loadingCount++;
            });

            const allPlatformGames = await fetchRandomGames({ platformsId: [1, 2], limit: 10 });
            const pcPlatformGames = await fetchRandomGames({ platformsId: [1], limit: 6 });
            const playstationPlatformGames = await fetchRandomGames({ platformsId: [2], limit: 6 });
            await new Promise(resolve => setTimeout(resolve, 1000));

            runInAction(() => {
                this._gamesAllPlatform = allPlatformGames;
                this._gamesPcPlatform = pcPlatformGames;
                this._gamesPlaystationPlatform = playstationPlatformGames;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні списку ігор:', error);
            this._loadingCount--;
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
        return this._loadingCount > 0;
    }
}
