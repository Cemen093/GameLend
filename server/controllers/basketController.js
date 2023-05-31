const ApiError = require("../error/ApiError");
const {Basket, Game, BasketItem, Platform} = require("../models/models");
const sequelize = require('../db')

class BasketController {
    async getAllGameFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({where: {userId}});
            const games = await basket.getGames({
                include: [{
                    model: Platform,
                    as: 'platforms',
                    through: {
                        attributes: []
                    },
                }],
            });

            return res.json({count: games.length, rows: games});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async addGameToBasket(req, res, next) {
        console.log("addGameToBasket")
        try {
            const userId = req.user.id;
            const {gameId} = req.body;
            console.log("userId")
            console.log("gameId")
            console.log(gameId)

            const basket = await Basket.findOne({where: {userId}});
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItem = await basket.hasGame(game);
            if (existingItem) {
                return next(ApiError.badRequest("Уже в корзине"));
            }

            await basket.addGame(game, {through: BasketItem, individualHooks: true});
            return res.json({message: "Игра успешно добавлена в корзину"});
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

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItem = await basket.hasGame(game);
            if (!existingItem) {
                return next(ApiError.badRequest("Нет в корзине"));
            }

            await basket.removeGame(game, {through: BasketItem, individualHooks: true});

            return res.json("Игра успешно удалена из корзины");
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async removeAllGameFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({where: {userId}});
            if (!basket) {
                return next(ApiError.notFound('Корзина не найдена'));
            }
            await BasketItem.destroy({ where: { basketId: basket.id } });

            return res.json({ message: 'Все игры удалены из корзины' });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BasketController();
