import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from './list.module.css'

const List = ({title, textEmpty, onTitleClick, items, itemsComponent, loading, className, style = {}, ...props}) => {
    const navigate = useNavigate();

    return (
        <div className={`${styles.listContainer} ${className}`} style={style} {...props}>
            <div className={styles.listTitle} onClick={onTitleClick}>{title}</div>
            <div className={styles.listItemsContainer}>
                {(loading ? [...Array(5)] : items).map((item, i) =>
                    React.cloneElement(itemsComponent, {key: i, item, loading})
                )
                }
                {!loading && items.length <= 0 && <div>{textEmpty}</div>}
            </div>
        </div>
    )
}

export default List;
