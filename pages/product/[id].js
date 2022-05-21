import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/Product.module.css';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import classNames from 'classnames'


const Product = ({ pizza }) => {
    const [size, setSize] = useState(0);
    const [sizeColor, setSizeColor] = useState(false);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [quantity, setQuantity] = useState(1)
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct({ ...pizza, extras, price, quantity }));
    }
    // pizza = {
    //     id: 1,
    //     img: "/img/pizza.png",
    //     name: "CAMPAGNOLA",
    //     price: [19.9, 23.9, 27.9],
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
    // };

    const changePrice = (number) => {
        setPrice(price + number);
    }
    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }

    const handleExtraIngredientChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra.id !== option.id));
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
                </div>
            </div>
            <div className={styles.right} >
                <h1 className={styles.title}>{pizza.name}</h1>
                <span className={styles.price}>{price} &euro;</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src={((size === 0) ? '/img/pizzaSize.png' : '/img/size.png')} layout="fill" alt="" />
                        <span className={classNames([
                            (size === 0) ? [styles.pizzaSizeColor] : [styles.number]
                        ])}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src={((size === 1) ? '/img/pizzaSize.png' : '/img/size.png')} layout="fill" alt="" />
                        <span className={classNames([
                            (size === 1) ? [styles.pizzaSizeColor] : [styles.number]
                        ])}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src={((size === 2) ? '/img/pizzaSize.png' : '/img/size.png')} layout="fill" alt="" />
                        <span className={classNames([
                            (size === 2) ? [styles.pizzaSizeColor] : [styles.number]
                        ])}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose the additional ingredients</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOptions.map((option) => {
                        return (
                            <div className={styles.option} key={option.id}>
                                <input
                                    type="checkbox"
                                    id={option.text}
                                    name={option.text}
                                    className={styles.checkbox}
                                    onChange={(e) => handleExtraIngredientChange(e, option)}
                                />
                                <label htmlFor="double">{option.text}</label>
                            </div>
                        )
                    })}

                    {/* <div className={styles.option}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="cheese"
                            name="cheese"
                        />
                        <label htmlFor="cheese">Extra Cheese</label>
                    </div>
                    <div className={styles.option}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="spicy"
                            name="spicy"
                        />
                        <label htmlFor="spicy">Spicy Sauce</label>
                    </div>
                    <div className={styles.option}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="garlic"
                            name="garlic"
                        />
                        <label htmlFor="garlic">Garlic Sauce</label>
                    </div> */}
                </div>
                <div className={styles.add}>
                    <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={quantity} className={styles.quantity} />
                    <button className={styles.button}
                        onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    )


}
export const getServerSideProps = async ({ params }) => {

    let errorCode = false;
    try {
        const res = await axios.get(`https://624b52c271e21eebbcf0b4ba.mockapi.io/pizzas/${params.id}`)
            .catch(error => {
                errorCode = error.response.status;
            });
        if (errorCode) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                pizza: res.data
            }
        };

    } catch (error) {
        console.log(error);
    }




};


export default Product
