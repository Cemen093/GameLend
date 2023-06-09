const {OrderList, OrderItem, Order, Game, GamePlatform, Platform} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require('../db');

class OrderListController {
    async getAllOrders(req, res, next) {
        const userId = req.user.id;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const orderList = await OrderList.findOne({ where: { userId } });

            const orders = await Order.findAll({
                where: { orderListId: orderList.id },
                include: {
                    model: OrderItem,
                    include: Game,
                },
                limit,
                offset
            });

            return res.json({count: orders.length, rows: orders});
        } catch (e) {
            console.error(e.message)
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAllGamesConfirmedOrders(req, res, next) {
        const userId = req.user.id;

        try {
            const orderList = await OrderList.findOne({ where: { userId } });

            const orders = await Order.findAll({
                where: { orderListId: orderList.id, isPaid: true  },
                include: {
                    model: OrderItem,
                    include: Game,
                    attributes: ['id', 'price', 'quantity'],
                }
            });

            const games = orders.flatMap((order) => order.Games);

            return res.json({ count: games.length, rows: games });
        } catch (e) {
            console.error("getAllGamesConfirmedOrders")
            console.error(e.message)
            return next(ApiError.badRequest(e.message));
        }
    }

    async createOrder(req, res, next) {
        const userId = req.user.id;
        const { items } = req.body;
        console.log(req.body)
        console.log(req.params)

        const orderList = await OrderList.findOne({ where: { userId } });
        let transaction;
        try {
            transaction = await sequelize.transaction();

            const newOrder = await Order.create({ orderListId: orderList.id }, { transaction });

            const orderItems = items.map((item) => ({
                orderId: newOrder.id,
                gameId: item.id,
                price: item.price,
                quantity: item.quantity,
            }));

            await OrderItem.bulkCreate(orderItems, { transaction });

            await transaction.commit();

            const orders = await Order.findAll({
                where: { orderListId: orderList.id },
                include: {
                    model: OrderItem,
                    include: Game,
                    attributes: ['id', 'price', 'quantity'],
                },
                limit: 10
            });

            return res.json(orders);
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }
            return next(ApiError.badRequest(e.message));
        }
    }

    async confirmPaymentOrder(req, res, next) {
        const {orderId} = req.body
        const order = await Order.findByPk(orderId);
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
