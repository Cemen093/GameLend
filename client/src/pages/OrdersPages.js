import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import {Context} from "../index";
import styles from "../styles/orders.css"

const OrdersPages = () => {
    const {userStore, dataStore} = useContext(Context);
    const OrderItem = ({order, ...props}) => {
        return (
            <div className="order-row order-item">
                <div className="order-col order-col-1 order-col-main">
                    <img src={process.env.REACT_APP_API_URL + '/' + order.games[0].imgName} alt={order.games.title}/>
                    <div className=" ">{order.games[0].title}</div>
                </div>
                <div className="order-col order-col-2">{order.games.reduce((acc, game) => acc + parseInt(game.price), 0)} ₴</div>
                <div className="order-col order-col-3">{order.isPaid ? "Оплачен" : "Не оплачен"}</div>
                <div className="order-col order-col-4">{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
        )
    }

    return (
        <Container fluid className="order-container p-0 mt-2 mb-4 pb-4">
            <div className="game-list">
                <div className="order-row">
                    <div className="order-col order-col-1">Заказы</div>
                    <div className="order-col order-col-2">Цена</div>
                    <div className="order-col order-col-3">Статус</div>
                    <div className="order-col order-col-4">Дата</div>
                </div>
                {userStore.orders.count > 0 ?
                    userStore.orders.rows.map(order => <OrderItem key={order.id} order={order}/>)
                    :
                    <div className="order-row orders-empty">На данный момент заказов нет</div>
                }
            </div>
        </Container>
    );
};

export default observer(OrdersPages);
