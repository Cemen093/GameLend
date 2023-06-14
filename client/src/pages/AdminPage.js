import React, {useContext, useState} from 'react';
import AddGameModal from "../components/modal/AddGameModal";
import FormModal from "../components/formModal/FormModal";
import BlackButton from "../components/buttons/BlackButton";
import PageContent from "../components/pageContent/PageContent";
import {Context} from "../index";
import Modal from "../components/modal/modal/Modal";
import FormWrapper from "../components/formWrapper/FormWrapper";
import OrdersModal from "../components/modal/orders/OrdersModal";
import styles from "../styles/page/adminPage.module.css"

const AdminPage = () => {
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
    const [isMakeAdminModalOpen, setIsMakeAdminModalOpen] = useState(false);
    const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
    const {userStore} = useContext(Context)

    const Modals = () => {
        return (
            <>
                <FormModal
                    isOpen={isBlockUserModalOpen}
                    setIsOpen={setIsBlockUserModalOpen}
                    textSuccess={"Користувач заблокований"}
                    textFailure={"Помилка при спробі заблокувати користувача"}
                    send={userStore.updateUserByAdmin.bind(userStore)}
                >
                    <input type="email" name="email" placeholder="Вкажіть пошту користувача"/>
                    <input type="text" name="blocked" value={"true"} style={{display: 'none'}}/>
                    <input type="date" name="blockedUntil" placeholder="Вкажіть дату розблокування"/>
                    <textarea name="reasonBlocking" placeholder="Вкажіть причину блокування" />
                    <button type="submit">Підтвердити</button>
                </FormModal>
                <FormModal
                    isOpen={isMakeAdminModalOpen}
                    setIsOpen={setIsMakeAdminModalOpen}
                    textSuccess={"Користувач став адміністратором"}
                    textFailure={"Помилка при спробі оновлення ролі користувача"}
                    send={userStore.updateUserByAdmin.bind(userStore)}
                >
                    <input type="email" name="email" placeholder="Вкажіть пошту користувача"/>
                    <input type="text" name="role" value={"ADMIN"} style={{display: 'none'}}/>
                    <button type="submit">Підтвердити</button>
                </FormModal>
                <OrdersModal
                    className={``}
                    isOpen={isOrdersModalOpen}
                    setIsOpen={setIsOrdersModalOpen}
                    send={console.log}
                />
            </>
        )
    }

    return (
        <PageContent>
            <Modals/>
            <BlackButton className={styles.button} onClick={() => setShowAddGameModal(true)}>
                Додати гру
            </BlackButton>
            {showAddGameModal &&
                <AddGameModal show={showAddGameModal} onHide={() => setShowAddGameModal(false)}/>}

            <BlackButton className={styles.button} onClick={() => setIsBlockUserModalOpen(true)}>
                Заблокувати користувача
            </BlackButton>
            <BlackButton className={styles.button} onClick={() => setIsMakeAdminModalOpen(true)}>
                Зробити користувача адміністратором
            </BlackButton>
            <BlackButton className={styles.button} onClick={() => setIsOrdersModalOpen(true)}>
                Замовлення
            </BlackButton>
        </PageContent>
    );
};

export default AdminPage;
