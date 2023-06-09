import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {fetchGame} from "../http/gameAPI";
import StyledDropdown from "../components/styledDropdown/StyledDropdown";
import StyledInput from "../components/styledInput/StyledInput";
import GrayButton from "../components/buttons/GrayButton";
import PageContent from "../components/pageContent/PageContent";
import styles from "../styles/page/orderingPage.module.css"

const OrderingPage = () => {
    const {gameId} = useParams();
    const {userStore, gameStore, platformsStore} = useContext(Context);
    const [items, setItems] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isFromBasket, setIsFromBasket] = useState(true);
    const [isPayDone, setIsPayDone] = useState(false);
    const [isPaySuccessful, setIsPaySuccessful] = useState(true);


    useEffect(() => {
        const fetch = async () => {
            if (gameId) {
                await fetchGame(gameId).then(data => ({...data, quantity: 1})).then(data => setItems([data]))
                setIsFromBasket(false);
            } else {
                setItems(userStore.basketGames.map(game => ({...game, quantity: 1})));
            }
            setIsLoading(false)
        }

        fetch().catch(e => console.error("error " + e.message))
    }, [])

    if (isLoading) {
        return <div>Loading</div>
    }

    if (items?.length <= 0) {
        return <div>Список заказів пуст</div>
    }

    const increaseQuantity = (id) => {
        setItems(prevGames => {
            return prevGames.map(game => {
                if (game.id === id) {
                    return {...game, quantity: game.quantity + 1};
                }
                return game;
            });
        });
    }
    const decreaseQuantity = (id) => {
        setItems(prevGames => {
            return prevGames.map(game => {
                if (game.id === id && game.quantity > 1) {
                    return {...game, quantity: game.quantity - 1};
                }
                return game;
            });
        });
    }

    const GameItem = ({game, ...props}) => {
        return (
            <div className={styles.item} {...props}>
                <img className={styles.image} src={process.env.REACT_APP_API_URL + '/' + game.imgName} alt="poster"/>
                <div className={styles.itemContent}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>{game.title}</div>
                    </div>
                    <div className={styles.quantityContainer}>
                        <div className={styles.quantityButton} onClick={() => decreaseQuantity(game.id)}>-</div>
                        <div className={styles.quantityCount}>{game.quantity}</div>
                        <div className={styles.quantityButton} onClick={() => increaseQuantity(game.id)}>+</div>
                    </div>
                    <div className={styles.priceContainer}>
                        <div className={styles.price}>{game.price} ₴</div>
                    </div>
                </div>
            </div>
        )
    }

    const handleBuy = async (items) => {
        const result = await userStore.createOrder(items, isFromBasket)
        if (result) {
            setIsPaySuccessful(true)
        } else {
            setIsPaySuccessful(false)
        }
        setIsPayDone(true)
    }

    return (
        <PageContent className="bg-black">
            {isPayDone
                ?
                isPaySuccessful
                    ?
                    <div className={styles.message}>
                        <div className={styles.mTitle}>Вітаю вас з успішним замовленням у нашому інтернет-магазині!</div>
                        <div className={styles.mText}>Зачекайте ваше замовлення зараз в обробці</div>
                    </div>
                    :
                    <div className={styles.message}>
                        <div className={styles.mTitle}>Під час обробки винекла помилка</div>
                        <div className={styles.mText}>Зверніться до адміна за контактами</div>
                    </div>
                :
                <div>
                    <div className={styles.list}>
                        {items.map(game => <GameItem key={game.id} game={game}/>)}
                    </div>
                    <div className={styles.whiteLine}/>
                    <div className={styles.totalPriceContainer}>
                        <div className={styles.totalPrice}>
                            Вместе: {items.reduce((acc, game) => acc + (game.price * game.quantity), 0)} ₴
                        </div>
                    </div>
                    <div className={styles.whiteLine}/>
                    <StyledDropdown
                        title="Выберите платформу: "
                        selectedItem={selectedPlatform}
                        setSelectedItem={setSelectedPlatform}
                        items={platformsStore.platforms}
                        className="ms-2 mt-4"
                    />
                    <StyledInput
                        title="Введите промокод: "
                        value={promoCode}
                        setValue={setPromoCode}
                        className="ms-2 mt-4"
                    />
                    <div className={styles.whiteLine}/>
                    <div className={styles.buyButtonContainer}>
                        <GrayButton className="mt-2 me-4" onClick={() => handleBuy(items)}>Купить</GrayButton>
                    </div>
                </div>
            }
        </PageContent>
    );
};

export default observer(OrderingPage);
