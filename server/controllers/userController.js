const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Wishlist, OrderList} = require('../models/models')
const {Op} = require("sequelize");
const sequelize = require("../db");

const generateJwt = (user) => {
    const {id, login, email, img, role} = user
    return jwt.sign(
        {id, login, email, img, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}


function updateUser(user) {
    const {dataValues} = user;
    return {
        ...dataValues,
        img: process.env.API_URL + dataValues.img,
    };
}

class UserController {
    async registration(req, res, next) {
        let transaction;
        try {
            const {login, email, password, img = 'defaultUser.png', role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }
            const candidate = await User.findOne({where: {email}});
            if (candidate) {
                return next(ApiError.badRequest('Пользователь уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 7)
            const user = {login, email, password: hashPassword, img, role};

            transaction = await sequelize.transaction();
            const newUser = await User.create(user, { transaction })
            await Basket.create({userId: newUser.id}, { transaction })
            await Wishlist.create({userId: newUser.id}, { transaction })
            await OrderList.create({userId: newUser.id}, { transaction })
            await transaction.commit();

            const token = generateJwt(updateUser(newUser));
            return res.json({token})
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }
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
        if (!user) {
            return next(ApiError.badRequest("Неверный логин или email"))
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest("Неверный пароль"))
        }

        const token = generateJwt(updateUser(user));
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt({...req.user})
        return res.json({token})
    }
}

module.exports = new UserController()
