const ApiError = require("../error/ApiError");
const { Basket, Game, BasketItem } = require("../models/models");
const sequelize = require('../db')

class BasketController {
    async getBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({ where: { userId } });
            const games = await basket.getGames();

            return res.json({ basket, games });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async addGameToBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const { gameId } = req.body;

            const basket = await Basket.findOne({ where: { userId } });
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItem = await basket.hasGame(game);
            if (existingItem) {
                return next(ApiError.badRequest("Уже в корзине"));
            }

            await basket.addGame(game, { through: BasketItem, individualHooks: true });
            return res.json({ message: "Игра успешно добавлена в корзину" });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async updateGameQuantity(req, res, next) {
        try {
            const userId = req.user.id;
            const { gameId, operation } = req.body;
            const basket = await Basket.findOne({ where: { userId } });
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }
            const existingItem = await basket.hasGame(game);
            if (!existingItem) {
                return next(ApiError.badRequest("Нет в корзине"));
            }
            const gameCount = await BasketItem.sum('quantity', {
                where: { basketId: basket.id, gameId: game.id }
            });

            let message = '';
            if (operation === "increase") {
                await BasketItem.update(
                    { quantity: sequelize.literal('quantity + 1') },
                    { where: { basketId: basket.id, gameId: game.id } }
                );
                message = "Количество игры в корзине увеличено на 1";
            } else if (operation === "decrease") {
                if (gameCount <= 1) {
                    return next(ApiError.badRequest("Количество не может быть меньше 1"));
                }
                await BasketItem.update(
                    { quantity: sequelize.literal('quantity - 1') },
                    { where: { basketId: basket.id, gameId: game.id } }
                );
                message = "Количество игры в корзине уменьшено на 1";
            } else {
                return next(ApiError.badRequest("operation не корректный"));
            }

            return res.json({ message: message });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
    async removeGameFromBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const { gameId } = req.body;
            const basket = await Basket.findOne({ where: { userId } });
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItem = await basket.hasGame(game);
            if (!existingItem) {
                return next(ApiError.badRequest("Нет в корзине"));
            }

            await basket.removeGame(game, { through: BasketItem, individualHooks: true });

            return res.json({ message: "Игра успешно удалена из корзины" });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BasketController();
