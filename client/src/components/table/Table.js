import React from 'react';
import styles from "./table.module.css";

const Table = ({items, headerTableComponent, itemsComponent, itemsEmptyComponent, loading, textEmpty,
                   className='', style={}}) => {
    return (
        <div className={`${styles.tabContainer} ${className}`} style={style}>
            {headerTableComponent}
            <div className={styles.rowsContainer}>
                {(loading ? [...Array(5)] : items).map((item, i) =>
                    React.cloneElement(itemsComponent, {key: i, item, loading})
                )
                }
                {!loading && items.length <= 0 && itemsEmptyComponent}
            </div>
        </div>
    )
}

export default Table;
