import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);


    return (
        <>
            <div className={styles.container}>

                <div className={styles.item}>
                    <div className={styles.callbutton}>
                        <Image src="/img/telephone.png" alt="callme" width="32" height="32" />
                    </div>
                    <div className={styles.texts}>
                        <div className={styles.text}>ORDER NOW!</div>
                        <div className={styles.text}>+49 012 345678</div>
                    </div>
                </div>
                <div className={styles.item}>

                    <ul className={styles.list}>
                        <li className={styles.listItem}><a href="">Homepage</a> </li>
                        <li className={styles.listItem}><a href="">Products</a></li>
                        <li className={styles.listItem}><a href="">Menu</a></li>
                        <Image src="/img/logo.png" alt="pizzaRestaurantLogo" width="160px" height="69px" />
                        <li className={styles.listItem}><a href="">Events</a></li>
                        <li className={styles.listItem}><a href="">Blog</a></li>
                        <li className={styles.listItem}><a href="">Contact</a></li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src="/img/cart.png" alt="cart" width="30px" height="30px" />
                        <div className={styles.counter}>2</div>
                    </div>
                </div>
                <button className={styles.hamburger} onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}>
                    {/* icon from heroicons.com */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

            </div>


            <div className={styles.itemExpanded}>

                <ul className={isNavExpanded ? styles.listExpanded : styles.displayNone
                }>
                    <li className={styles.listItemExpand}><a href="">Homepage</a> </li>
                    <li className={styles.listItemExpand}><a href="">Products</a></li>
                    <li className={styles.listItemExpand}><a href="">Menu</a></li>
                    {/* <Image src="/img/logo.png" alt="pizzaRestaurantLogo" width="160px" height="69px" /> */}
                    <li className={styles.listItemExpand}><a href="">Events</a></li>
                    <li className={styles.listItemExpand}><a href="">Blog</a></li>
                    <li className={styles.listItemExpand}><a href="">Contact</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar
