import {makeAutoObservable, runInAction} from 'mobx';
import {fetchAllCommentsForGame} from "../http/commentAPI";

export default class PlatformsStore {
    _comments = [];
    _loadingCount = 0;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchComments(gameId) {
        try {
            runInAction(() => this._loadingCount++);

            const platforms = await fetchAllCommentsForGame(gameId).then(data => data.rows);

            runInAction(() => {
                this._comments = platforms;
                this._loadingCount--;
            });
        } catch (error) {
            console.error('Помилка при отриманні списку коментарів:', error);
            this._loadingCount--;
        }
    }

    get comments() {
        return this._comments;
    }

    get loading() {
        return this._loadingCount > 0;
    }
}
