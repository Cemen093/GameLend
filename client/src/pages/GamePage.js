import React, {useContext, useEffect, useState} from 'react';
import {Container, Image} from "react-bootstrap";
import colors from "../utils/colors";
import basket from "../assets/basket.png";
import {Context} from "../index";
import {useLocation, useParams} from "react-router-dom";
import {fetchGame} from "../http/gameAPI";
import {observer} from "mobx-react-lite";

const GamePage = () => {
    const {dataStore} = useContext(Context);
    const location = useLocation();
    const {id} = useParams();

    useEffect(() => {
        const fetch = async () => {
            await fetchGame(id).then(data => dataStore.setGame(data))
        }

        fetch()
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

    return (
        <Container style={{backgroundColor: colors.black}} className="">
            <Container fluid className="d-flex flex-row justify-content-around mt-5" style={{height: 400}}>
                <Image width="45%" src={process.env.REACT_APP_API_URL + '/' + dataStore.game.img} className="m-2" style={{ objectFit: 'cover' }} />
                <iframe width="45%" src={"https://www.youtube.com/embed/" + dataStore.game.trailer} frameBorder="0"
                        allowFullScreen className="m-2"></iframe>

            </Container>
            <Container fluid className="d-flex justify-content-end">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row align-items-center">
                        <div className="d-flex align-items-center justify-content-center rounded-5 cursor-pointer"
                             style={{background : `url(${basket}) no-repeat center center`,
                                 backgroundSize: 'cover', width: 30, height: 30}}></div>
                        <div className="d-flex align-items-center justify-content-center bg-white m-2 py-1 px-3 cursor-pointer"
                             style={{width: 100}}>
                            {dataStore.game.price} ₴
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex align-items-center justify-content-center m-2 py-1 px-3 text-nowrap cursor-pointer"
                             style={{width: 100, background: colors.grayBrown}}>
                            В корзину
                        </div>
                    </div>
                </div>
            </Container>
            <Container fluid className="d-flex flex-row justify-content-around my-5" style={{color: colors.white}}>
                <div style={{width: "45%", backgroundColor: colors.grayBrown}} className="p-3">
                    <div>Описание</div>
                    {dataStore.game.description}
                </div>
                <div style={{width: "45%", backgroundColor: colors.grayBrown}} className="p-3">
                    <h3>Минимальные требования:</h3>
                    {createRequirement(dataStore.game.min_requirement)}
                    <h3>Рекомендуемые требования:</h3>
                    {createRequirement(dataStore.game.rec_requirement)}
                </div>
            </Container>
        </Container>
    );
};

export default observer(GamePage);
