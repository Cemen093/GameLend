import {makeAutoObservable, runInAction} from 'mobx';
import {fetchPlatforms} from "../http/platformAPI";
import {fetchAllCommentsForGame} from "../http/commentAPI";

export default class PlatformsStore {
    _comments = [];
    _loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchComments(gameId) {
        try {
            runInAction(() => this._loading = true);

            const platforms = await fetchAllCommentsForGame(gameId).then(data => data.rows);

            runInAction(() => {
                this._comments = platforms;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні списку коментарів:', error);
            this._loading = false;
        }
    }

    get comments() {
        return this._comments;
    }

    get loading() {
        return this._loading;
    }
}
