const uuid = require('uuid')
const path = require('path')
const {Game, MinRequirement, RecRequirement} = require("../models/models");
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");

class GameController {
    async create (req, res, next) {
        const {title, description, platform, trailer, minRequirement, recRequirement} = req.body
        if (!minRequirement || !recRequirement){
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
                {title, description, platform, img: imgName, trailer})

            await MinRequirement.create(JSON.parse(minRequirement).gameId = game.id);
            await RecRequirement.create(JSON.parse(recRequirement).gameId = game.id);

            return res.json(game)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { title, platform, page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            let whereCondition = {};
            if (platform) {
                whereCondition.platform = platform;
            }
            if (title) {
                whereCondition.title = { [Op.like]: `%${title}%` };
            }

            const games = await Game.findAndCountAll({
                where: whereCondition,
                include: [MinRequirement, RecRequirement],
                limit,
                offset });

            res.json(games);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const game = await Game.findOne({
                where: {id: id},
                include: [MinRequirement, RecRequirement],
            })
            res.json(game);
        } catch (e){
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new GameController()
