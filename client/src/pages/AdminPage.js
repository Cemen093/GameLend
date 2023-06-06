import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import AddGameModal from "../components/modal/AddGameModal";
import AddGameModalJson from "../components/modal/AddGameModalJson";

const AdminPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleHideAddModal = () => {
        setShowAddModal(false);
    };

    return (
        <div>
            <h1>Сторінка з іграми</h1>

            <button onClick={handleShowAddModal}>Додати гру</button>
            {showAddModal && (
                <AddGameModal show={showAddModal} onHide={handleHideAddModal} />
            )}
        </div>
    );
};

export default observer(AdminPage);
