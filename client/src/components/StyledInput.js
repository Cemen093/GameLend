import React from 'react';
import {observer} from "mobx-react-lite";
import '../styles/input.css'

const StyledInput = ({title, value, setValue, className = '', placeholder, ...props}) => {
    return (
        <div className={'styled-input ' + className}  {...props}>
            <div className="styled-input-title">{title}</div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder || "Поиск..."}
            />
        </div>
    );
};

export default observer(StyledInput);
