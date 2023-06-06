const ApiError = require("../error/ApiError");
const {Basket, Game, BasketItem, Platform, Discount, GamePlatform, WishlistItem} = require("../models/models");
const sequelize = require('../db')

class BasketController {
    async getAllGameFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({where: {userId}});

            const games = await basket.getGames({
                include: [{model: Platform, through: {attributes: [],},},],
            });
            return res.json({count: games.length, rows: games});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async addGameToBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const {gameId} = req.body;

            const basket = await Basket.findOne({where: {userId}});
            const game = await Game.findByPk(gameId);

            const existingItem = await basket.hasGame(game);
            if (existingItem) {
                return next(ApiError.badRequest("Уже в корзине"));
            }

            await basket.addGame(game, { through: BasketItem, individualHooks: true });
            const games = await basket.getGames({
                include: [{model: Platform, through: {attributes: [],},},],
            });

            return res.json({count: games.length, rows: games});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async removeGameFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const {gameId} = req.params;
            const basket = await Basket.findOne({where: {userId}});
            const game = await Game.findByPk(gameId);

            const existingItem = await basket.hasGame(game);
            if (!existingItem) {
                return next(ApiError.badRequest("Нет в корзине"));
            }

            await basket.removeGame(game, {through: BasketItem, individualHooks: true});
            const games = await basket.getGames({
                include: [{model: Platform, through: {attributes: [],},},],
            });

            return res.json({count: games.length, rows: games});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async removeAllGameFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({where: {userId}});

            await BasketItem.destroy({ where: { basketId: basket.id } });
            const games = await basket.getGames({
                include: [{model: Platform, through: {attributes: [],},},],
            });

            return res.json({count: games.length, rows: games});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BasketController();
