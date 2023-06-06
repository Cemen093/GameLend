import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import {fetchPlatforms} from "../http/platformAPI";

export default class PlatformsStore {
    _platforms = [];
    _loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchPlatforms() {
        try {
            runInAction(() => {
                this._loading = true;
            });

            const platforms = await fetchPlatforms().then(data => data.rows);

            runInAction(() => {
                this._platforms = platforms;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні списку платформ:', error);
            this._loading = false;
        }
    }

    get platforms() {
        return this._platforms;
    }

    get loading() {
        return this._loading;
    }
}
