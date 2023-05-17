import React from 'react';
import {Container, Image} from "react-bootstrap";
import colors from "../utils/colors";
import basket from "../assets/basket.png";

const GamePage = ({id}) => {
    const game =             {
            "id": 1,
            "title": "Assassins Creed Valhalla",
            "description": "Assassins Creed Valhalla — игра в жанре action/RPG, разработанная студией Ubisoft Montreal и изданная Ubisoft. Игра была выпущена 10 ноября 2020 года на платформах PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, Microsoft Windows и Stadia.",
            "platforms": ["PS4", "PS5", "Xbox One", "Xbox Series X/S", "PC", "Stadia"],
            "price": "1500",
            "img": "https://upload.wikimedia.org/wikipedia/ru/thumb/7/7c/Warhammer40000SpaceMarinecover.jpg/411px-Warhammer40000SpaceMarinecover.jpg",
            "trailer": "https://www.youtube.com/watch?v=ssrDYcCi_4I",
            "createdAt": "2023-05-12T02:03:11.928Z",
            "updatedAt": "2023-05-12T02:03:11.928Z",
            "min_requirement": {
                "id": 1,
                "cpu": "Intel Core i3",
                "ram": "4GB",
                "os": "Windows 10",
                "space": "250GB",
                "createdAt": "2023-05-12T02:03:11.943Z",
                "updatedAt": "2023-05-12T02:03:11.943Z",
                "gameId": 1
            },
            "rec_requirement": {
                "id": 1,
                "cpu": "Intel Core i5",
                "ram": "8GB",
                "os": "Windows 10",
                "space": "256GB",
                "createdAt": "2023-05-12T02:03:11.943Z",
                "updatedAt": "2023-05-12T02:03:11.943Z",
                "gameId": 1
            }
        }

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
                <Image width="45%" src={game.img} className="m-2" style={{ objectFit: 'cover' }} />
                <iframe width="45%" src="https://www.youtube.com/embed/4JNDR9tj4pw" frameBorder="0"
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
                            {game.price} ₴
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
                    {game.description}
                </div>
                <div style={{width: "45%", backgroundColor: colors.grayBrown}} className="p-3">
                    <h3>Минимальные требования:</h3>
                    {createRequirement(game.min_requirement)}
                    <h3>Рекомендуемые требования:</h3>
                    {createRequirement(game.rec_requirement)}
                </div>
            </Container>
        </Container>
    );
};

export default GamePage;
