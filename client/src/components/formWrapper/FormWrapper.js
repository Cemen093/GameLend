import React, { useState } from 'react';
import styles from './formWrapper.module.css';

const FormWrapper = ({ children, onSubmit }) => {
    const initialFormData = {};
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.props.name && child.props.value) {
            initialFormData[child.props.name] = child.props.value;
        }
    });
    const [formData, setFormData] = useState(initialFormData);
    const [formFileData, setFormFileData] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        if (e.target.type === 'file'){
            setFormFileData((prevData) => ({ ...prevData, [name]: files[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({...formData, ...formFileData});
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'input') {
                        return React.cloneElement(child, {
                            className: styles.input,
                            value: formData[child.props.name] || '',
                            onChange: handleChange,
                        });
                    } else if (React.isValidElement(child) && child.type === 'textarea') {
                        return React.cloneElement(child, {
                            className: styles.textarea,
                            value: formData[child.props.name] || '',
                            onChange: handleChange,
                        });
                    }else if (React.isValidElement(child) && child.type === 'button') {
                        return React.cloneElement(child, {
                            className: styles.button,
                        });
                    }
                    return child;
                })}
            </form>
        </div>
    );
};

export default FormWrapper;
