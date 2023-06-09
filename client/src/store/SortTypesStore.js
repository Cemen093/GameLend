import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import {fetchPlatforms} from "../http/platformAPI";
import {createSortType, fetchSortTypes} from "../http/sortTypesAPI";

export default class SortTypesStore {
    _sortTypes = [];
    _loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async createSortType(title, order) {
        try {
            runInAction(() => this._loading = true);
            await createSortType();
            runInAction(() => this._loading = false);
        } catch (error) {
            console.error('Помилка при створенні типоу сортування:', error);
            this._loading = false;
        }
    }

    async fetchSortTypes() {
        try {
            runInAction(() => this._loading = true);
            const typeSorts = await fetchSortTypes().then(data => data.rows);
            runInAction(() => {
                this._sortTypes = typeSorts;
                this._loading = false;
            });
        } catch (error) {
            console.error('Помилка при отриманні типів сортування:', error);
            this._loading = false;
        }
    }

    async fetchSortType(id) {
        try {
            return  await fetchSortTypes();
        } catch (error) {
            console.error('Помилка при отриманні типу сортування:', error);
            this._loading = false;
        }
    }
    get sortTypes() {
        return this._sortTypes;
    }

    get loading() {
        return this._loading;
    }
}
