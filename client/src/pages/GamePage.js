import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useLocation, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ButtonsBox from "../components/buttons/ButtonsBox";
import PageContent from "../components/pageContent/PageContent";
import styles from "../styles/page/gamePage.module.css"

const GamePage = () => {
    const {gameStore} = useContext(Context);
    const location = useLocation();
    const {id} = useParams();
    const [isInit, setIsInit] = useState(true);

    useEffect(() => {
        gameStore.fetchGame(id).then(() => setIsInit(false))
    }, [location])

    const Requirement = ({rec}) => {
        const {cpu, ram, os, space} = rec
        return (
            <div className={styles.requirementContainer}>
                <ul className={styles.requirementList}>
                    <li className={styles.requirementListItem}><strong>CPU:</strong> {cpu}</li>
                    <li className={styles.requirementListItem}><strong>RAM:</strong> {ram}</li>
                    <li className={styles.requirementListItem}><strong>OS:</strong> {os}</li>
                    <li className={styles.requirementListItem}><strong>Место на жестком диске:</strong> {space}</li>
                </ul>
            </div>
        )
    }

    if (gameStore.loading || isInit) {
        return <div></div>
    }

    return (
        <PageContent className={styles.container}>
            <div className={styles.multimediaContainer}>
                <img src={process.env.REACT_APP_API_URL + '/' + gameStore.game.imgName} className={styles.poster}
                     alt="poster"/>
                <iframe className={styles.trailer} src={"https://www.youtube.com/embed/" + gameStore.game.trailer}
                        allowFullScreen></iframe>
            </div>
            <div className={styles.buttonsContainer}>
                <ButtonsBox game={gameStore.game} buttons={{addToBasket: true, addToWishlist: true, buy: true}}/>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.descriptionContainer}>
                    <div className={styles.descriptionTitle}>Опис</div>
                    <div className={styles.description}>{gameStore.game.description}</div>
                </div>
                <div className={styles.requirementsContainer}>
                    <div className={styles.requirementTitle}>Мінімальні вимоги:</div>
                    <Requirement rec={gameStore.game.min_requirement}/>
                    <div className={styles.requirementTitle}>Рекомендовані вимоги:</div>
                    <Requirement rec={gameStore.game.rec_requirement}/>
                </div>
            </div>
        </PageContent>
    );
};

export default observer(GamePage);
