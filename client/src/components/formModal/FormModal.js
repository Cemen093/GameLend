import React, {useState} from 'react';
import Modal from "../modal/modal/Modal";
import FormWrapper from "../formWrapper/FormWrapper";

const FormModal = ({isOpen, setIsOpen, textSuccess, textFailure, send, children}) => {
    const [result, setResult] = useState('');

    const handleSubmit = async (formData) => {
        const res = await send(formData);
        if (res) {
            setResult(textSuccess)
        } else {
            setResult(textFailure)
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} result={result} setResult={setResult}>
            <FormWrapper onSubmit={handleSubmit}>
                {children}
            </FormWrapper>
        </Modal>
    )
};

export default FormModal;
