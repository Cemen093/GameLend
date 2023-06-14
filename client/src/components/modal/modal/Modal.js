import React, {useState, useRef, useEffect} from 'react';
import styles from './modal.module.css';

const Modal = ({isOpen, setIsOpen, children, result, setResult, className = '', style = {}}) => {
    const modalRef = useRef(null);

    const closeModal = () => {
        if (setResult) {
            setResult('')
        }
        setIsOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            {isOpen && (
                <div className={`${styles.modalOverlay}`}>
                    <div ref={modalRef} className={`${styles.modalContent} ${className}`} style={style}>
                        {
                            result
                                ?
                                <div>{result}</div>
                                :
                                <>
                                    {children}
                                </>
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
