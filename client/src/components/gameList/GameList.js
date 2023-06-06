import React from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ButtonsBox from "../ButtonsBox";
import {GAME_ROUTE} from "../../utils/consts";
import styles from "./gameList.module.css"

const GameList = ({games, loading, textEmpty = '', buttons, className, itemClassName, ...props}) => {
    const navigate = useNavigate();

    const GameItem = ({game, loading = false, buttons, className, ...props}) => {
        return (
            <>
                {loading
                    ?
                    <div className={`${styles.item} ${itemClassName}`} {...props}>
                        <div className={`${styles.image} ${styles.imageLoading}`}></div>
                        <div className={styles.textContainer}>
                            <div className={`${styles.title} ${styles.titleLoading}`}/>
                            <div className={styles.platformsContainer}>
                                <div className={`${styles.platform} ${styles.platformOneLoading}`}/>
                                <div className={`${styles.platform} ${styles.platformTwoLoading}`}/>
                            </div>
                        </div>
                        <ButtonsBox game={game} buttons={buttons} loading={loading}/>
                    </div>
                    :
                    <div className={`${styles.item} ${itemClassName}`} {...props}>
                        <img
                            className={styles.image}
                            src={process.env.REACT_APP_API_URL + '/' + game.imgName}
                            alt={game.title}
                            onClick={() => navigate(GAME_ROUTE + '/' + game.id)}/>
                        <div className={styles.textContainer}>
                            <div className={styles.title}>{game.title}</div>
                            <div className={styles.platformsContainer}>
                                {game.platforms.map((platform, index) => (
                                    <div key={index} className={styles.platform}>{platform.title}</div>
                                ))}
                            </div>
                        </div>
                        <ButtonsBox game={game} buttons={buttons}/>
                    </div>
                }
            </>
        );
    }

    return (
        <div className={`${styles.list} ${className}`} {...props}>
            {loading
                ?
                [...Array(5)].map((_, i) => <GameItem key={i} buttons={buttons} loading={true}/>)
                :
                games.length > 0
                    ?
                    games.map(game => <GameItem key={game.id} game={game} buttons={buttons}/>)
                    :
                    <div className={`${styles.item} ${styles.textEmpty}`}>{textEmpty}</div>
            }
        </div>
    );
};

export default observer(GameList);
