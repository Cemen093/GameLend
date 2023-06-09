import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import {Context} from "../index";
import Table from "../components/table/Table";
import styles from "../styles/page/ordersPage.module.css"

const OrdersPages = () => {
    const {userStore} = useContext(Context);

    const HeaderTable = ({className='', style={}}) => {
        return (
            <div className={`${styles.orderRow} ${styles.headerTitle} ${className}`} style={style}>
                <div className={`${styles.orderCol} ${styles.headerTitle} ${styles.orderCol1}`}>Замовлення</div>
                <div className={`${styles.orderCol} ${styles.headerTitle} ${styles.orderCol2}`}>Ціна</div>
                <div className={`${styles.orderCol} ${styles.headerTitle} ${styles.orderCol3}`}>Статус</div>
                <div className={`${styles.orderCol} ${styles.headerTitle} ${styles.orderCol4}`}>Дата</div>
            </div>
        )
    }
    const OrderItem = ({item, loading, className='', style={}}) => {
        if (loading) {
            return (
                <div className={`${styles.orderRow} ${className}`} style={style}>
                    <div className={`${styles.orderCol} ${styles.orderCol1} ${styles.itemCardContainer} ${styles.itemCardContainerSkeleton}`}>
                        <div className={`${styles.itemCardImage} ${styles.itemCardImageSkeleton}`}/>
                        <div className={`${styles.itemCardTitle} ${styles.itemCardTitleSkeleton}`}/>
                    </div>
                    <div className={`${styles.orderCol} ${styles.orderCol2}`}/>
                    <div className={`${styles.orderCol} ${styles.orderCol3}`}/>
                    <div className={`${styles.orderCol} ${styles.orderCol4}`}/>
                </div>
            )
        }

        return (
            <div className={`${styles.orderRow} ${className}`} style={style}>
                <div className={`${styles.orderCol} ${styles.orderCol1} ${styles.itemCardContainer}`}>
                    <img className={`${styles.itemCardImage}`} src={process.env.REACT_APP_API_URL + '/' + item.imgName} alt={item.title}/>
                    <div className={`${styles.itemCardTitle}`}>{item.title}</div>
                </div>
                <div className={`${styles.orderCol} ${styles.orderCol2}`}>{item.price} ₴</div>
                <div className={`${styles.orderCol} ${styles.orderCol3}`}>{item.isPaid ? "Оплачен" : "Не оплачен"}</div>
                <div className={`${styles.orderCol} ${styles.orderCol4}`}>{new Date(item.buyAt).toLocaleDateString()}</div>
            </div>
        )
    }

    const ItemsEmpty = () => {
        return (
            <div className={styles.itemsEmpty}>
                На даний момент замовлень немає
            </div>
        )
    }

    return (
        <Container fluid className={`${styles.container} p-0 mt-2 mb-4 pb-4`}>
            <Table
                className={``}
                style={{}}
                items={userStore.orderGames}
                headerTableComponent={<HeaderTable className={``} style={{}}/>}
                itemsComponent={<OrderItem className={``} style={{}}/>}
                itemsEmptyComponent={<ItemsEmpty/>}
                loading={userStore.loading}
            />
        </Container>
    );
};

export default observer(OrdersPages);
