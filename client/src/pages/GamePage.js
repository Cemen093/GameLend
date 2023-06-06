import React, {useContext, useEffect, useState} from 'react';
import {Container, Image} from "react-bootstrap";
import colors from "../utils/colors";
import basket from "../assets/basket.png";
import {Context} from "../index";
import {useLocation, useParams} from "react-router-dom";
import {fetchGame} from "../http/gameAPI";
import {observer} from "mobx-react-lite";
import ButtonsBox from "../components/ButtonsBox";

const GamePage = () => {
    const {gameStore} = useContext(Context);
    const location = useLocation();
    const {id} = useParams();

    useEffect(() => {
        gameStore.fetchGame(id)
    }, [location])

    const createRequirement = ({cpu, ram, os, space}) => {
        return (
        <div style={{padding: "20px"}}>
            <ul style={{listStyleType: "none", paddingLeft: "0"}}>
                <li><strong>CPU:</strong> {cpu}</li>
                <li><strong>RAM:</strong> {ram}</li>
                <li><strong>OS:</strong> {os}</li>
                <li><strong>Место на жестком диске:</strong> {space}</li>
            </ul>
        </div>
        )
    }

    if (gameStore.loading){
        return <div></div>
    }
    console.log(gameStore.game)

    return (
        <Container style={{backgroundColor: colors.black}} className="">
            <Container fluid className="d-flex flex-row justify-content-around mt-5" style={{height: 400}}>
                <Image width="45%" src={process.env.REACT_APP_API_URL + '/' + gameStore.game.imgName} className="m-2" style={{ objectFit: 'cover' }} />
                <iframe width="45%" src={"https://www.youtube.com/embed/" + gameStore.game.trailer} frameBorder="0"
                        allowFullScreen className="m-2"></iframe>

            </Container>
            <Container fluid className="d-flex justify-content-end">
                <ButtonsBox game={gameStore.game} buttons={{addToBasket: true, addToWishlist: true, buy: true}}/>
            </Container>
            <Container fluid className="d-flex flex-row justify-content-around my-5" style={{color: colors.white}}>
                <div style={{width: "45%", backgroundColor: colors.grayBrown}} className="p-3">
                    <div>Описание</div>
                    {gameStore.game.description}
                </div>
                <div style={{width: "45%", backgroundColor: colors.grayBrown}} className="p-3">
                    <h3>Минимальные требования:</h3>
                    {createRequirement(gameStore.game.min_requirement)}
                    <h3>Рекомендуемые требования:</h3>
                    {createRequirement(gameStore.game.rec_requirement)}
                </div>
            </Container>
        </Container>
    );
};

export default observer(GamePage);
