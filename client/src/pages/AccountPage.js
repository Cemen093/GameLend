import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import pencil from "../assets/pencil.png"
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, GAME_ROUTE, ORDERS_ROUTE, WISHLIST_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import PageContent from "../components/pageContent/PageContent";
import GrayButton from "../components/buttons/GrayButton";
import RoundImageButton from "../components/buttons/RoundImageButton";
import List from "../components/list/List";
import FormModal from "../components/formModal/FormModal";
import styles from "../styles/page/accountPage.module.css"

const AccountPage = () => {
    const navigate = useNavigate();
    const {userStore} = useContext(Context)
    const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] = useState(false);
    const [isChangeLoginModalOpen, setIsChangeLoginModalOpen] = useState(false);
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);

    const User = observer(({...props}) => {
        if (userStore.loading) {
            return (
                <div className={styles.userContainer} {...props}>
                    <div className={`${styles.profileImageSkeleton} ${styles.profileImage}`}/>
                    <div className={`${styles.contentSkeleton} ${styles.content}`}>
                        <div className={styles.row}>
                            <div className={`${styles.text} ${styles.textSkeleton}`}/>
                            <RoundImageButton className={`m-2`} loading={true}/>
                        </div>
                        <div className={styles.row}>
                            <div className={`${styles.text} ${styles.textSkeleton}`}/>
                            <RoundImageButton className={`m-2`} loading={true}/>
                        </div>
                        {userStore.isAdmin &&
                            <div className={styles.row}>
                                <GrayButton loading={true}>Адмінка</GrayButton>
                            </div>
                        }
                    </div>
                </div>
            )
        }

        return (
            <div className={styles.userContainer} {...props}>
                <img className={styles.profileImage} src={process.env.REACT_APP_API_URL + '/' + userStore.user.imgName}
                     alt="profile" onClick={() => setIsChangeProfileModalOpen(true)}/>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={`${styles.text}`}>{userStore.user.login}</div>
                        <RoundImageButton className={`m-2 color-black`} image={pencil} diameter={23}
                        onClick={() => setIsChangeLoginModalOpen(true)}/>
                    </div>
                    <div className={styles.row}>
                        <div className={`${styles.text}`}>{userStore.user.email}</div>
                        <RoundImageButton className={`m-2`} image={pencil} diameter={23} alt="edit-email-btn"
                                          onClick={() => setIsChangeEmailModalOpen(true)}/>
                    </div>
                    {userStore.isAdmin &&
                        <div className={styles.row}>
                            <GrayButton onClick={() => navigate(ADMIN_ROUTE)}>Адмінка</GrayButton>
                        </div>
                    }
                </div>
            </div>
        )
    })

    const BasketGames = observer(() => {
        return (
            <List
                className={'p-2 mt-2'}
                title="Кошик"
                textEmpty="В кошику поки нема ігор"
                onTitleClick={() => navigate(BASKET_ROUTE)}
                items={userStore.basketGames}
                itemsComponent={<Item className={""}/>}
                loading={userStore.loading}
            />
        )
    })

    const WishlistGames = observer(() => {
        return (
            <List
                className={'p-2 mt-2'}
                title="Список бажаного"
                textEmpty="В списку бажаного поки нема ігор"
                onTitleClick={() => navigate(WISHLIST_ROUTE)}
                items={userStore.wishlistGames}
                itemsComponent={<Item className={""}/>}
                loading={userStore.loading}
            />
        )
    })

    const BoughtGames = observer(() => {
        return (
            <List
                className={'p-2 mt-4'}
                title="Придбанно"
                textEmpty="В придбаному поки нема ігор"
                onTitleClick={() => navigate(ORDERS_ROUTE)}
                items={userStore.boughtOrderGames}
                itemsComponent={<BoughtItem className={""}/>}
                loading={userStore.loading}
            />
        )
    })

    const BoughtItem = ({item, loading, className, style = {}, ...props}) => {
        if (loading) {
            return (
                <div className={`${styles.boughtItem} ${styles.boughtItemSkeleton}`}>
                    <div className={`${styles.boughtImage} ${styles.boughtImageSkeleton}`}/>
                    <div className={`${styles.boughtItemContent} ${styles.boughtItemContentSkeleton}`}>
                        <div className={`${styles.boughtItemTitle} ${styles.boughtItemTitleSkeleton}`}/>
                        <div className={`${styles.boughtItemBoughtAt} ${styles.boughtItemBoughtAtSkeleton}`}/>
                    </div>
                </div>
            )
        }

        return (
            <div key={item.id} className={styles.boughtItem}>
                <img className={styles.boughtImage} src={process.env.REACT_APP_API_URL + '/' + item.imgName}
                     alt="poster"/>
                <div className={styles.boughtItemContent}>
                    <div className={styles.boughtItemTitle}>{item.title}</div>
                    <div
                        className={styles.boughtItemBoughtAt}>Куплено: {(new Date(item.buyAt)).toLocaleDateString()}</div>
                </div>
            </div>
        )
    }

    const Item = ({item, loading, className, style = {}, ...props}) => {

        if (loading) {
            return (
                <div className={styles.itemContainerSkeleton}>
                    <div className={styles.itemImageSkeleton}/>
                </div>
            )
        }

        return (
            <div className={`${styles.itemContainer} ${className}`} style={style}
                 onClick={() => navigate(GAME_ROUTE + '/' + item?.id)}>
                <img className={styles.itemImage} src={process.env.REACT_APP_API_URL + '/' + item?.imgName}
                     alt="picture"/>
                <div className={styles.itemTitle}>{item?.title}</div>
            </div>
        )
    }

    const Modals = () => {
        return(
            <>
                <FormModal
                    isOpen={isChangeLoginModalOpen}
                    setIsOpen={setIsChangeLoginModalOpen}
                    textSuccess={"Логин успішно змінено"}
                    textFailure={"Помилка при спробі зміни логіна"}
                    send={userStore.updateUser.bind(userStore)}
                >
                    <input type="text" name="login" placeholder="Логин" />
                    <button type="submit">Підтвердити</button>
                </FormModal>
                <FormModal
                    isOpen={isChangeEmailModalOpen}
                    setIsOpen={setIsChangeEmailModalOpen}
                    textSuccess={"Пошта успішно змінено"}
                    textFailure={"Помилка при спробі зміни пошти"}
                    send={userStore.updateUser.bind(userStore)}
                >
                    <input type="email" name="email" placeholder="Пошта" />
                    <button type="submit">Підтвердити</button>
                </FormModal>
                <FormModal
                    isOpen={isChangeProfileModalOpen}
                    setIsOpen={setIsChangeProfileModalOpen}
                    textSuccess={"Профіль успішно змінено"}
                    textFailure={"Помилка при спробі зміни профілю"}
                    send={userStore.updateUser.bind(userStore)}
                >
                    <input type="file" name="img" placeholder="Профіль" />
                    <button type="submit">Підтвердити</button>
                </FormModal>
            </>
        )
    }

    return (
        <PageContent className={`${styles.container}`}>
            <Modals/>
            <div className={styles.column}>
                <User/>
                <BoughtGames/>
            </div>
            <div className={styles.column}>
                <BasketGames/>
                <WishlistGames/>
            </div>
        </PageContent>
    );
};

export default AccountPage;
