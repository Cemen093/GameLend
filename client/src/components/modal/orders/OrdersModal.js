import React, {useContext, useState} from 'react';
import Modal from "../modal/Modal";
import {observer} from "mobx-react-lite";
import Table from "../../table/Table";
import {Context} from "../../../index";
import DisplayDropdown from "../../dropdown/displayDropdown/DisplayDropdown";
import WhiteButton from "../../buttons/WhiteButton";
import styles from './ordersModal.module.css'

const OrdersModal = ({isOpen, setIsOpen, send, className = '', style = {}}) => {
    const {orderStore} = useContext(Context)

    const HeaderTable = ({className = '', style = {}}) => {
        return (
            <div className={`${styles.orderRow} ${styles.headerTitle} ${className}`} style={style}>
                <div className={`${styles.headerTitle} ${styles.orderCol} ${styles.orderCol1}`}>Логін</div>
                <div className={`${styles.headerTitle} ${styles.orderCol} ${styles.orderCol2}`}>Замовлення</div>
                <div className={`${styles.headerTitle} ${styles.orderCol} ${styles.orderCol3}`}>Ціна</div>
                <div className={`${styles.headerTitle} ${styles.orderCol} ${styles.orderCol4}`}>Надіслати реквізити
                </div>
                <div className={`${styles.headerTitle} ${styles.orderCol} ${styles.orderCol5}`}>Надіслати ключ</div>
            </div>
        )
    }

    const ItemOne = ({user, loading, className = '', style = {}}) => {
        if (loading) {
            return (
                <div className={`${styles.itemOneContainer} ${styles.itemOneContainerSkeleton} ${className}`}
                     style={style}>
                    <div className={`${styles.itemOneImage} ${styles.itemOneImageSkeleton}`}/>
                    <div className={`${styles.itemOneTitle} ${styles.itemOneTitleSkeleton}`}>{user.login}</div>
                </div>
            )
        }
        return (
            <div className={`${styles.itemOneContainer} ${className}`} style={style}>
                <img className={`${styles.itemOneImage}`} src={process.env.REACT_APP_API_URL + '/' + user.imgName}
                     alt="profile"/>
                <div className={`${styles.itemOneTitle}`}>{user.login}</div>
            </div>
        )
    }

    const ItemTwo = ({games, loading}) => {
        return <DisplayDropdown title={'Замовлення'} items={games} loading={loading}
                                className={styles.itemTwo} classNameMenu={styles.itemTwoMenu}
        />
    }

    const ItemThree = ({item, loading}) => {
        return <div className={`${styles.itemThree} ${loading && styles.itemThreeSkeleton}`}>
            {!loading && `${orderStore.getOrderGames(item).reduce((acc, game) => acc + parseInt(game.price), 0)}  ₴`}
        </div>
    }

    const ItemFour = ({item, loading}) => {
        return (
            <WhiteButton onClick={() => orderStore.sendPaymentDetails(item.id)}
                         loading={loading} active={!item.isPaid} className={styles.button}>
                {item.isPaid ? "Оплачено" : "Надіслати"}
            </WhiteButton>
        )
    }

    const ItemFive = ({item, loading}) => {
        const handleClick = async () => {
            const message = await orderStore.confirmPaymentOrder(item.id);
            console.log(message)
        }

        return (
            <WhiteButton onClick={handleClick}
                         loading={loading} active={!item.isPaid} className={styles.button}>
                {item.isPaid ? "Надіслано" : "Надіслати"}
            </WhiteButton>
        )
    }

    const OrderItem = ({item, loading, className = '', style = {}}) => {
        if (loading) {
            return (
                <div className={`${styles.orderRow} ${className}`} style={style}>
                    <div className={`${styles.orderCol} ${styles.orderCol1}`}/>
                    <div className={`${styles.orderCol} ${styles.orderCol2}`}/>
                    <div className={`${styles.orderCol} ${styles.orderCol3}`}/>
                    <div className={`${styles.orderCol} ${styles.orderCol4}`}/>
                    <div className={`${styles.orderCol} ${styles.orderCol5}`}/>
                </div>
            )
        }

        return (
            <div className={`${styles.orderRow} ${className}`} style={style}>
                <div className={`${styles.orderCol} ${styles.orderCol1}`}>
                    <ItemOne user={item.user} loading={loading}/>
                </div>
                <div className={`${styles.orderCol} ${styles.orderCol2}`}>
                    <ItemTwo games={orderStore.getOrderGames(item)} loading={loading}/>
                </div>
                <div className={`${styles.orderCol} ${styles.orderCol3}`}>
                    <ItemThree item={item} loading={loading}/>
                </div>
                <div className={`${styles.orderCol} ${styles.orderCol4}`}>
                    <ItemFour item={item} loading={loading}/>
                </div>
                <div className={`${styles.orderCol} ${styles.orderCol5}`}>
                    <ItemFive item={item} loading={loading}/>
                </div>
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

    const Modals = observer(() => {
        return (
            <>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={{width: "90%"}}>
                    <Table
                        className={``}
                        style={{}}
                        items={orderStore.orders}
                        headerTableComponent={<HeaderTable className={``} style={{}}/>}
                        itemsComponent={<OrderItem className={``} style={{}}/>}
                        itemsEmptyComponent={<ItemsEmpty/>}
                        loading={!orderStore.init}
                    />
                </Modal>
            </>
        )
    })

    return (
        <div className={`${styles.container} ${className}`} style={style}>
            <Modals/>
        </div>
    );
};

export default OrdersModal;
