import React, { useState, useEffect } from 'react'
import pizzastyles from "../styles/PizzaList.module.css";
import PizzaCard from "../components/PizzaCard";
import axios from 'axios'

import Categories from './Categories';
import styles from '../styles/menu.module.scss';
// import '../App.css';
import NoDataFound from './NoDataFound';
import PizzaList from '../components/PizzaList'


export default function Menus({ pizzaList }) {
    const [menuItems, setMenuItems] = useState(pizzaList);
    const [allMenus, setAllMenus] = useState([])
    const [categories, setCategories] = useState([])

    const getMenuItems = () => {
        // getAllMenus()
        //     .then((response) => {
        //         setMenuItems(response.data);
        setAllMenus(menuItems);
        const categories = ['all', ...new Set(menuItems.map(item => item.category))];
        setCategories(categories);
        //     })
        //     .catch(err => {
        //         setMenuItems([]);
        //     });
    };

    useEffect(() => {
        getMenuItems()
    }, []);


    const filterItems = (category) => {
        if (category === 'all') {
            setMenuItems(allMenus);
            return;
        }
        const newItems = allMenus.filter((item) => item.category === category);
        setMenuItems(newItems);
    }


    return (
        <main>
            <section className={styles.menu}>
                {(menuItems.length <= 0) ? <NoDataFound /> :
                    <>
                        <div className={styles.title}>
                            <h2>Our Menu</h2>
                            <div className={styles.underline}></div>
                        </div>
                        <Categories filterItems={filterItems} categories={categories} />
                        <div className={pizzastyles.wrapper}>
                            {menuItems.map((pizza) => (
                                <PizzaCard key={pizza.id} pizza={pizza} />
                            ))}
                        </div>
                    </>
                }
            </section>
        </main>
    )
}


export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`https://624b52c271e21eebbcf0b4ba.mockapi.io/pizzas/`);

    return {
        props: {
            pizzaList: res.data,
        },
    };
};

