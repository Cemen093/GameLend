import {makeAutoObservable, runInAction} from "mobx";
import {
    confirmPaymentOrder,
    deleteOrder,
    fetchAllOrders,
    sendPaymentDetails
} from "../http/orderAPI";

export default class OrderStore {
    _orders = [];
    _loadingCount = 0;
    _init = false;

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAllOrders() {
        try {
            runInAction(() => this._loadingCount++);
            const orders = await fetchAllOrders().then(data => data.rows)

            runInAction(() => {
                this._orders = orders;
                this._loadingCount--;
                this._init = true;
            });
        } catch (error) {
            console.error('Помилка при отриманні заказів:', error);
            this._loadingCount--;
            this._init = true;
        }
    }

    async sendPaymentDetails(orderId) {
        try {
            runInAction(() => this._loadingCount++);

            const res = await sendPaymentDetails(orderId)

            runInAction(() => this._loadingCount--);
            return res.message
        } catch (error) {
            console.error('Помилка при підтвердженні заказу:', error);
            this._loadingCount--;
            return error.response.data.message
        }
    }

    async confirmPaymentOrder(orderId) {
        try {
            runInAction(() => this._loadingCount++);

            const res = await confirmPaymentOrder(orderId)
            await this.fetchAllOrders()

            runInAction(() => this._loadingCount--);
            return res.message
        } catch (error) {
            console.error('Помилка при підтвердженні заказу:', error);
            this._loadingCount--;
            return error.response.data.message
        }
    }

    async deleteOrder(id) {
        try {
            runInAction(() => this._loadingCount++);

            const res = await deleteOrder(id)
            await this.fetchAllOrders()

            runInAction(() => {
                this._loadingCount--;
            });
            return res.message
        } catch (error) {
            console.error('Помилка при видалені закаду:', error);
            this._loadingCount--;
            return error.response.data.message
        }
    }

    getOrderGames(order) {
        return order?.order_items?.flatMap(item =>
            Array.from({ length: item.quantity }, () => ({
                ...item.game,
                price: item.price,
                isPaid: order.isPaid,
                buyAt: order.createdAt
            }))
        ) || []
    }

    get orders() {
        return this._orders;
    }

    get loading() {
        return this._loadingCount > 0 || !this._init;
    }

    get init() {
        return this._init;
    }
}
