const uuid = require('uuid')
const path = require('path')
const {
    Game,
    MinRequirement,
    RecRequirement,
    Platform,
    GamePlatform,
    TypeSort,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");

class GameController {
    async create(req, res, next) {
        const {title, description, price, trailer, platformsId, minRequirement, recRequirement} = req.body
        if (!minRequirement || !recRequirement) {
            return next(ApiError.badRequest("Отсутствуют системные требования"))
        }
        try {
            const {img} = req.files
            let imgName = "gameImage.jpg";
            if (img) {
                imgName = uuid.v4() + ".jpg"
                await img.mv(path.resolve(__dirname, '..', 'static', imgName))
            }

            const game = await Game.create(
                {title, description, price, imgName: imgName, trailer})

            MinRequirement.create(JSON.parse(minRequirement).gameId = game.id);
            RecRequirement.create(JSON.parse(recRequirement).gameId = game.id);
            for (const platformId of platformsId) {
                const platform = await Platform.findByPk(platformId);
                if (platform) {
                    platform.setGame(game.id)
                }
            }

            return res.json(game)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {title = '', platformsId = [], typeSortId = 1, page = 1, limit = 10} = req.query;
            const offset = (page - 1) * limit;

            const typeSort = await TypeSort.findByPk(typeSortId);
            if (!typeSort) {
                return next(ApiError.badRequest('Не верный typeSortId'));
            }
            const order = typeSort.order;

            let gameWhereCondition = {};
            if (title) {
                gameWhereCondition = {
                    ...gameWhereCondition,
                    title: {[Op.iLike]: `%${title.toLowerCase()}%`},
                };
            }

            let platformWhereCondition = {};
            if (platformsId.length > 0) {
                platformWhereCondition = {
                    ...platformWhereCondition,
                    id: {[Op.in]: platformsId}
                }
            }


            const data = await Game.findAndCountAll({
                distinct: true,
                where: gameWhereCondition,
                include: [
                    {
                        model: Platform,
                        through: {
                            attributes: []
                        },
                        where: platformWhereCondition,
                    },
                    MinRequirement,
                    RecRequirement,
                ],
                order,
                limit,
                offset,
            });
            const gameIds = data.rows.map(game => game.id);

            data.rows = await Game.findAll({
                distinct: true,
                where: {id: {[Op.in]: gameIds}},
                include: [
                    {
                        model: Platform,
                        through: {
                            attributes: []
                        },
                    },
                    MinRequirement,
                    RecRequirement,
                ],
                order,
            })

            res.json(data);

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const game = await Game.findOne({
                where: {id: id},
                include: [
                    {
                        model: Platform,
                        through: {
                            attributes: []
                        }
                    },
                    MinRequirement,
                    RecRequirement
                ],
            })
            res.json(game);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new GameController()
