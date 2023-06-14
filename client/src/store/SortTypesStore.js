import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import {fetchPlatforms} from "../http/platformAPI";
import {createSortType, fetchSortTypes} from "../http/sortTypesAPI";

export default class SortTypesStore {
    _sortTypes = [];
    _loadingCount = 0;
    _init = false;

    constructor() {
        makeAutoObservable(this);
    }

    async createSortType(title, order) {
        try {
            runInAction(() => this._loadingCount++);
            await createSortType();
            runInAction(() => this._loadingCount--);
        } catch (error) {
            console.error('Помилка при створенні типоу сортування:', error);
            this._loadingCount--;
        }
    }

    async fetchSortTypes() {
        try {
            runInAction(() => this._loadingCount++);
            const typeSorts = await fetchSortTypes().then(data => data.rows);
            await new Promise(resolve => setTimeout(resolve, 1000));
            runInAction(() => {
                this._sortTypes = typeSorts;
                this._loadingCount--;
                this._init = true;
            });
        } catch (error) {
            console.error('Помилка при отриманні типів сортування:', error);
            this._loadingCount--;
        }
    }

    async fetchSortType(id) {
        try {
            return  await fetchSortTypes();
        } catch (error) {
            console.error('Помилка при отриманні типу сортування:', error);
            this._loadingCount--;
        }
    }
    get sortTypes() {
        return this._sortTypes;
    }

    get loading() {
        return this._loadingCount > 0 || !this._init;
    }
}
