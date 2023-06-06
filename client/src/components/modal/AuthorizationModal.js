import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import '../../styles/authorization.css'
import {Context} from "../../index";

const AuthorizationModal = ({...props}) => {
    const {userStore} = useContext(Context)
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        passwordRepeat: '',
    });
    const [errors, setErrors] = useState({
        login: '',
        email: '',
        password: '',
        passwordRepeat: '',
    });

    const clearFormData = () => {
        setFormData({
            login: '',
            email: '',
            password: '',
            passwordRepeat: '',
        })
    }
    const clearErrors = () => {
        setErrors({
            login: '',
            email: '',
            password: '',
            passwordRepeat: '',
        })
    }

    const handleFormChange = (e) => {
        setIsLoginForm(e.target.id === 'login')
        clearFormData();
        clearErrors();
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        let isAnyErrors = false;

        if (!isLoginForm) {
            // Валидация логина
            if (formData.login.trim().length < 4) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    login: 'Логин должен содержать не менее 4 символов.',
                }));
                isAnyErrors = true;
            }
        }

        // Валидация email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Пожалуйста, введите действительный email.',
            }));
            isAnyErrors = true
        }

        // Валидация пароля
        if (formData.password.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Пароль должен содержать не менее 8 символов.',
            }));
            isAnyErrors = true
        }

        // Валидация повтора пароля
        if (!isLoginForm) {
            if (formData.password !== formData.passwordRepeat) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordRepeat: 'Пароли должны совпадать',
                }));
                isAnyErrors = true;
            }
        }

        if (isAnyErrors) {
            return;
        }

        if (isLoginForm) {
            signIn()
        } else {
            signUp()
        }

        clearErrors()
        clearFormData();
        props.onHide();
    };

    const signIn = async () => {
        try {
            await userStore.login(formData.email, formData.password);
        } catch (e) {
            alert('Щось пішло не так\n' + e.message);
        }
    }
    const signUp = async () => {
        try {
            await userStore.registration(formData.login, formData.email, formData.password);
        } catch (e) {
            alert('Щось пішло не так\n' + e.message);
        }
    }

    const createHeader = () => {
        return (
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    <div className="flex-grow-1 d-flex flex-row justify-content-around">
                        <div
                            id="login"
                            className={"type " + (isLoginForm ? "active" : "")}
                            onClick={handleFormChange}
                        >
                            Вход
                        </div>
                        <div
                            id="registration"
                            className={"type " + (!isLoginForm ? "active" : "")}
                            onClick={handleFormChange}
                        >
                            Регистрация
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
        )
    }
    const createBody = () => {
        return (
            <Modal.Body>
                <Form>
                    {!isLoginForm &&
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="login"
                                placeholder="Логин"
                                value={formData.login}
                                onChange={handleChange}
                                isInvalid={!!errors.login}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.login}
                            </Form.Control.Feedback>
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {!isLoginForm &&
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                name="passwordRepeat"
                                placeholder="Повторите пароль"
                                value={formData.passwordRepeat}
                                onChange={handleChange}
                                isInvalid={!!errors.passwordRepeat}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordRepeat}
                            </Form.Control.Feedback>
                        </Form.Group>
                    }
                </Form>
            </Modal.Body>
        );
    };
    const createFooter = () => {
        return (
            <Modal.Footer>
                {isLoginForm ?
                    <Button variant="outline-success" type="submit" className="float-end"
                            onClick={handleSubmit}
                    >
                        Войти
                    </Button>
                    :
                    <Button variant="outline-success" type="submit" className="float-end"
                            onClick={handleSubmit}
                    >
                        Зарегистрироваться
                    </Button>
                }
                <Button variant="outline-primary" onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        )
    }

    return (
        <Modal
            {...props}
            size="lg"
            centered
            keyboard={true}
            aria-labelledby="modal-title"
        >
            {createHeader()}
            {createBody()}
            {createFooter()}
        </Modal>
    );
};

export default AuthorizationModal;
