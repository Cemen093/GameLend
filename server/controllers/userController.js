const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, WishList} = require('../models/models')
const {Op} = require("sequelize");

const generateJwt = (user) => {
    const {id, login, email, role} = user
    return jwt.sign(
        {id, login, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}
class UserController {
    async registration (req, res, next) {
        try {
            const {login, email, password, img, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('Пользователь уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 7)
            const user = await User.create(
                {login, email, password: hashPassword, img, role})
            const basket = await Basket.create({userId: user.id})
            const wishList = await WishList.create({userId: user.id})
            const token = generateJwt(user);
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        const {login, email, password} = req.body
        const whereClause = {};
        if (login) {
            whereClause.login = login;
        }
        if (email) {
            whereClause.email = email;
        }
        const user = await User.findOne({
            where: whereClause
        });
        if (!user){
            return next(ApiError.badRequest("Неверный логин или email"))
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword){
            return next(ApiError.badRequest("Неверный пароль"))
        }
        const token = generateJwt(user)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt({...req.user})
        res.json(token)
    }
}

module.exports = new UserController()
