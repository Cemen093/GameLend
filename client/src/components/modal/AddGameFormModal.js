import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from 'react-bootstrap';
import {Context} from "../../index";
import {createGame} from "../../http/gameAPI";

const AddGameFormModal = ({...props}) => {
    const {gameStore, platformsStore} = useContext(Context)
    const [gameData, setGameData] = useState({
        title: '',
        description: '',
        price: '',
        rating: '',
        img: null,
        trailer: '',
        platformsId: [],
        minRequirement: {
            cpu: '',
            ram: '',
            os: '',
            space: '',
        },
        recRequirement: {
            cpu: '',
            ram: '',
            os: '',
            space: '',
        },
    });
//TODO rating
    const clearGameData = () => {
        setGameData({
            title: '',
            description: '',
            price: '',
            rating: '',
            img: null,
            trailer: '',
            platformsId: [],
            minRequirement: {
                cpu: '',
                ram: '',
                os: '',
                space: '',
            },
            recRequirement: {
                cpu: '',
                ram: '',
                os: '',
                space: '',
            },
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setGameData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleImg = (e) => {
        const {name} = e.target;
        setGameData((prevData) => ({
            ...prevData,
            [name]: e.target.files[0],
        }));
    };

    const handlePlatformsChange = (e) => {
        const {name, value, checked} = e.target;

        if (checked) {
            setGameData((prevData) => ({
                ...prevData,
                platformsId: [...prevData.platformsId, parseInt(value)],
            }));
        } else {
            setGameData((prevData) => ({
                ...prevData,
                platformsId: prevData.platformsId.filter(item => item !== parseInt(value)),
            }));
        }
    };

    const handleMinRequirementChange = (e) => {
        const {name, value} = e.target;
        setGameData((prevData) => ({
            ...prevData,
            minRequirement: {...prevData.minRequirement, [name]: value},
        }));
    };

    const handleRecRequirementChange = (e) => {
        const {name, value} = e.target;
        setGameData((prevData) => ({
            ...prevData,
            recRequirement: {...prevData.recRequirement, [name]: value},
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regExp = /v=([^&]+)/;
        const match = gameData.trailer.match(regExp);


        await gameStore.createGame({...gameData, trailer: match[1]})
            // .then(() => clearGameData())
            // .then(() => props.onHide())
    };
    const createRequirement = (title, requirement, handleChange) => {
        return (

            <Form.Group>
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    type="text"
                    name="cpu"
                    value={requirement.cpu}
                    onChange={handleChange}
                    placeholder="Процесор"
                    required
                />
                <Form.Control
                    type="text"
                    name="ram"
                    value={requirement.ram}
                    onChange={handleChange}
                    placeholder="Оперативна пам'ять"
                    required
                />
                <Form.Control
                    type="text"
                    name="os"
                    value={requirement.os}
                    onChange={handleChange}
                    placeholder="Операційна система"
                    required
                />
                <Form.Control
                    type="text"
                    name="space"
                    value={requirement.space}
                    onChange={handleChange}
                    placeholder="Вільне місце на диску"
                    required
                />
            </Form.Group>
        )
    }

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Додати гру</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            name="title"
                            value={gameData.title}
                            onChange={handleChange}
                            placeholder="Назва"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={gameData.description}
                            onChange={handleChange}
                            placeholder="Опис"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="number"
                            name="price"
                            value={gameData.price}
                            onChange={handleChange}
                            placeholder="Ціна"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="number"
                            name="rating"
                            value={gameData.rating}
                            onChange={handleChange}
                            placeholder="Рейтинг"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Постер</Form.Label>
                        <Form.Control
                            type="file"
                            name="img"
                            onChange={handleImg}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            name="trailer"
                            value={gameData.trailer}
                            onChange={handleChange}
                            placeholder="Посилання на трейлер"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Оберіть платформи</Form.Label>
                        <div className="d-flex flex-row">
                            {platformsStore.platforms.map(platform =>
                                <Form.Check
                                    key={platform.id}
                                    className="me-2"
                                    type="checkbox"
                                    label={platform.title}
                                    name="platformsId"
                                    value={platform.id}
                                    checked={gameData.platformsId.includes(platform.id)}
                                    onChange={handlePlatformsChange}
                                />
                            )}
                        </div>
                    </Form.Group>
                    <div className="d-flex flex-row justify-content-between">
                    {createRequirement("Мінімальні вимоги", gameData.minRequirement, handleMinRequirementChange)}
                    {createRequirement("Рекомендовані вимоги", gameData.recRequirement, handleRecRequirementChange)}
                    </div>
                    <Button variant="primary" type="submit" className="mt-2">Додати</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddGameFormModal;
