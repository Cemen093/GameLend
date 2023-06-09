import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import wastebasket from "../../assets/wastebasket.png";
import {ORDERING_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import WhiteButton from "./WhiteButton";
import GrayButton from "./GrayButton";
import RoundImageButton from "./RoundImageButton";
import basket from "../../assets/basket.png";
import styles from "./buttons.module.css"

const ButtonsBox = ({game, loading, buttons}) => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className={styles.buttonsBox}>
            <div className={styles.buttonsBoxRow}>
                {buttons?.addToBasket &&
                    <RoundImageButton
                        className={styles.buttonsBoxItem}
                        image={basket}
                        diameter={28} alt="Кнопка додати в кошик"
                        onClick={() => userStore.addGameToBasket(game?.id)}
                        loading={loading}
                    />
                }
                {buttons?.moveToBasket &&
                    <RoundImageButton
                        className={styles.buttonsBoxItem}
                        image={basket}
                        diameter={28}
                        alt="Кнопка перемистити в кошик"
                        onClick={() => userStore.moveGameFromWishlistToBasket(game?.id)}
                        loading={loading}
                    />
                }
                {buttons?.removeFromBasket &&
                    <RoundImageButton
                        className={styles.buttonsBoxItem}
                        image={wastebasket}
                        diameter={28}
                        alt="Кнопка придбати з кошик"
                        onClick={() => userStore.removeGameFromBasket(game?.id)}
                        loading={loading}
                    />
                }
                {buttons?.removeFromWishlist &&
                    <RoundImageButton
                        className={styles.buttonsBoxItem}
                        image={wastebasket} diameter={28}
                        alt="Кнопка придбати з бажаного"
                        onClick={() => userStore.removeGameFromWishlist(game?.id)}
                        loading={loading}
                    />
                }
                {buttons?.buy &&
                    <WhiteButton
                        className={styles.buttonsBoxItem}
                        onClick={() => navigate(ORDERING_ROUTE + '/game/' + game?.id)}
                        loading={loading}
                    >
                        {game?.price} ₴
                    </WhiteButton>
                }
            </div>
            <div className={styles.buttonsBoxRow}>
                {buttons?.addToWishlist &&
                    <GrayButton
                        className={styles.buttonsBoxItem}
                        onClick={() => userStore.addGameToWishlist(game?.id)}
                        loading={loading}
                    >
                        В желаемое
                    </GrayButton>
                }
            </div>
        </div>
    );
};

export default ButtonsBox;
