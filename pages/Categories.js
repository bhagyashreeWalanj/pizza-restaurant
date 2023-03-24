import React from 'react'
import styles from '../styles/menu.module.scss';

export default function Categories({ categories, filterItems }) {
    return (
        <div className={styles.btnContainer}>
            {categories && categories.map((category, index) => {
                return (
                    <button
                        type="button"
                        className={styles.filterBtn}
                        key={index}
                        onClick={() => filterItems(category)}>
                        {category}
                    </button>
                )
            })}
        </div>
    )
}
