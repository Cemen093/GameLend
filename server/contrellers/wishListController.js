const ApiError = require("../error/ApiError");
const { Game, WishList, WishListItem, BasketItem, Basket} = require("../models/models");
const sequelize = require('../db');

class WishListController {
    async getWishList(req, res, next) {
        try {
            const userId = req.user.id;
            const wishList = await WishList.findOne({ where: { userId } });
            const games = await wishList.getGames();

            return res.json({ wishList, games });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async addGameToWishList(req, res, next) {
        try {
            const userId = req.user.id;
            const { gameId } = req.body;

            const wishList = await WishList.findOne({ where: { userId } });
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItem = await wishList.hasGame(game);
            if (existingItem) {
                return next(ApiError.badRequest("Уже в списке желаемого"));
            }

            await wishList.addGame(game, { through: WishListItem, individualHooks: true });
            return res.json({ message: "Игра успешно добавлена в список желаемого" });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async moveGameToBasket(req, res, next) {
        try {
            const userId = req.user.id;
            const { gameId } = req.body;

            const wishList = await WishList.findOne({ where: { userId } });
            const basket = await Basket.findOne({ where: { userId } });
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItemInWishList = await wishList.hasGame(game);
            const existingItemInBasket = await basket.hasGame(game);

            if (!existingItemInWishList) {
                return next(ApiError.badRequest("Игра не найдена в списке желаемого"));
            }

            if (existingItemInBasket) {
                return next(ApiError.badRequest("Игра уже находится в корзине"));
            }

            await wishList.removeGame(game, { through: WishListItem, individualHooks: true });
            await basket.addGame(game, { through: BasketItem, individualHooks: true });

            return res.json({ message: "Игра успешно перемещена из списка желаемого в корзину" });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async removeGameFromWishList(req, res, next) {
        try {
            const userId = req.user.id;
            const { gameId } = req.body;
            const wishList = await WishList.findOne({ where: { userId } });
            const game = await Game.findByPk(gameId);

            if (!game) {
                return next(ApiError.badRequest("Игра не найдена"));
            }

            const existingItem = await wishList.hasGame(game);
            if (!existingItem) {
                return next(ApiError.badRequest("Нет в списке желаемого"));
            }

            await wishList.removeGame(game, { through: WishListItem, individualHooks: true });

            return res.json({ message: "Игра успешно удалена из списка желаемого" });
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

}

module.exports = new WishListController();
