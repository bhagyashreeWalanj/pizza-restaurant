import React from 'react'
import styles from '../styles/menu.module.scss';

export default function Menu({ items }) {

    return (
        <div>

            <div className={styles.sectionCenter}>
                {items && items.map((menu) => {
                    const { id, title, img, desc, price } = menu;
                    return (
                        <article key={id} className={styles.menuItem}>
                            <img src={img} alt={title} className={styles.photo} />
                            <div className={styles.itemInfo}>
                                <header>
                                    <h4>{title}</h4>
                                    <h4 className={styles.price}>&euro;{price}</h4>
                                </header>
                                <p className={styles.itemtext}>{desc}</p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}
