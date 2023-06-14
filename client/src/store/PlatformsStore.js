import {makeAutoObservable, runInAction} from 'mobx';
import {fetchPlatforms} from "../http/platformAPI";

export default class PlatformsStore {
    _platforms = [];
    _loadingCount = 0;
    _init = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchPlatforms() {
        try {
            runInAction(() => {
                this._loadingCount++;
            });

            const platforms = await fetchPlatforms().then(data => data.rows);

            runInAction(() => {
                this._platforms = platforms;
                this._loadingCount--;
                this._init = true;
            });
        } catch (error) {
            console.error('Помилка при отриманні списку платформ:', error);
            this._loadingCount--;
        }
    }

    get platforms() {
        return this._platforms;
    }

    get platformsWithAll() {
        return [{title: 'Усі', ids: this._platforms.map(platform => platform.id)},
            ...this._platforms.map(platform => ({title: platform.title, ids: [platform.id]}))]
    }

    get loading() {
        return this._loadingCount > 0 || !this._init;
    }
}
