import React from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ButtonsBox from "../buttons/ButtonsBox";
import {GAME_ROUTE} from "../../utils/consts";
import styles from "./gameList.module.css"

const GameList = ({games, loading, textEmpty = '', buttons, className, itemClassName, ...props}) => {
    const navigate = useNavigate();

    const GameItem = ({game, loading = false, buttons, className, ...props}) => {
        if (loading) {
            return (
                <div className={`${styles.itemContainer} ${itemClassName}`} {...props}>
                    <div className={`${styles.itemImage} ${styles.itemImageSkeleton}`}></div>
                    <div className={styles.itemTextContainer}>
                        <div className={`${styles.itemTitle} ${styles.titleSkeleton}`}/>
                        <div className={styles.platformsContainer}>
                            <div className={`${styles.platform} ${styles.platformOneSkeleton}`}/>
                            <div className={`${styles.platform} ${styles.platformTwoSkeleton}`}/>
                        </div>
                    </div>
                    <ButtonsBox game={game} buttons={buttons} loading={loading}/>
                </div>
            )
        }

        return (
            <div className={`${styles.itemContainer} ${itemClassName}`} {...props}>
                <img
                    className={styles.itemImage}
                    src={process.env.REACT_APP_API_URL + '/' + game.imgName}
                    alt={game.title}
                    onClick={() => navigate(GAME_ROUTE + '/' + game.id)}/>
                <div className={styles.itemTextContainer}>
                    <div className={styles.itemTitle}>{game.title}</div>
                    <div className={styles.platformsContainer}>
                        {game.platforms.map((platform, index) => (
                            <div key={index} className={styles.platform}>{platform.title}</div>
                        ))}
                    </div>
                </div>
                <ButtonsBox game={game} buttons={buttons}/>
            </div>
        )
    }

    if (loading) {
        return (
            <div className={`${styles.container} ${className}`} {...props}>
                {[...Array(5)]
                    .map((game, i) => <GameItem key={i} game={game} loading={loading} buttons={buttons}/>)}
            </div>
        )
    }

    if (games.length <= 0) {

        return (
            <div className={`${styles.container}  ${className}`} {...props}>
                <div className={`${styles.textEmptyContainer}`}>
                    <div className={`${styles.textEmpty} ${styles.textEmpty}`}>{textEmpty}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${className}`} {...props}>
            {games.map((game, i) => <GameItem key={i} game={game} loading={loading} buttons={buttons}/>)}
        </div>
    );
};

export default observer(GameList);
