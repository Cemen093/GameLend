import {makeAutoObservable} from "mobx";

export default class DataStore {
    constructor() {
        this._gamesAllPlatform = {count: 0, rows: []}
        this._gamesPcPlatform = {count: 0, rows: []}
        this._gamesPlaystationPlatform = {count: 0, rows: []}
        this._gamesNavbarSearch = {count: 0, rows: []}
        this._gamesSearch = {count: 0, rows: []}
        this._game = {count: 0, rows: []}
        this._platforms = {count: 0, rows: []}
        this._typesSort = {count: 0, rows: []}
        makeAutoObservable(this)
    }

    setGamesAllPlatform(value) {
        this._gamesAllPlatform = value;
    }

    setGamesPcPlatform(value) {
        this._gamesPcPlatform = value;
    }

    setGamesPlaystationPlatform(value) {
        this._gamesPlaystationPlatform = value;
    }

    setGamesNavbarSearch(value) {
        this._gamesNavbarSearch = value;
    }

    setGamesSearch(value) {
        this._gamesSearch = value;
    }

    setPlatforms(value) {
        this._platforms = value;
    }

    setTypesSort(value) {
        this._typesSort = value;
    }

    setGame(value) {
        this._game = value;
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

    get gamesNavbarSearch() {
        return this._gamesNavbarSearch;
    }

    get gamesSearch() {
        return this._gamesSearch;
    }

    get game() {
        return this._game;
    }

    get platforms() {
        return this._platforms;
    }

    get typesSort() {
        return this._typesSort;
    }
}
