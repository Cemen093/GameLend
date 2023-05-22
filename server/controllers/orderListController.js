const {OrderList, OrderItem, Order, Game, GamePlatform} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require('../db');

class OrderListController {
    async getAllOrders(req, res, next) {
        const userId = req.user.id;
        const {page = 1, limit = 10} = req.query
        const offset = (page - 1) * limit;
        try {
            const orderList = await OrderList.findOne({where: {userId}})
            const orders = await Order.findAll({
                where: {orderListId: orderList.id},
                include: [
                    {model: Game, through: {model: OrderItem, attributes: []}}],
                offset: offset,
                limit: limit,
            });

            return res.json(orders)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    };

    async getAllGamesConfirmedOrders(req, res, next) {
        const userId = req.user.id;
        try {
            const orderList = await OrderList.findOne({where: {userId}})
            const orders = await Order.findAll({
                where: {orderListId: orderList.id},
                include: [
                    {model: Game, through: {attributes: []}}],
            });
            const games = orders.flatMap(order => order.games);

            res.json({count: games.length, rows: games});
        } catch (error) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async createOrder(req, res, next) {
        const userId = req.user.id;
        const {games} = req.body
        const orderList = await OrderList.findOne({where: {userId},});
        if (!orderList) {
            return next(ApiError.notFound('OrderList не найден для пользователя'));
        }

        let transaction;
        try {
            transaction = await sequelize.transaction();
            const newOrder = await Order.create({orderListId: orderList.id},
                {transaction});
            const orderItems = games.map((game) => ({...game, orderId: newOrder.id,}));
            await OrderItem.bulkCreate(orderItems, {transaction});

            await transaction.commit();

            return res.json({message: 'Заказ успешно создан'});
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }
            return next(ApiError.badRequest(e.message))
        }
    };

    async confirmPaymentOrder(req, res, next) {
        const {orderId} = req.params
        const order = await Order.findByPk(orderId);
        if (!order) {
            return next(ApiError.notFound('Заказ не найден'))
        }
        try {
            order.isPaid = true;
            await order.save();

            return res.json(order)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    };

    async deleteOrder(req, res, next) {
        const {orderId} = req.params;
        const order = await Order.findByPk(orderId);
        if (!order) {
            return next(ApiError.notFound('Заказ не найден'))
        }

        let transaction;
        try {
            transaction = await sequelize.transaction();
            await OrderItem.destroy({where: {orderId}, transaction});
            await order.destroy({transaction});
            await transaction.commit();

            return res.json(true)
        } catch (e) {
            if (transaction) {
                transaction.rollback()
            }
            return next(ApiError.badRequest(e.message))
        }
    };
}

module.exports = new OrderListController()
