import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Cart.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link';


const addNewOrder = order => {
    const data = order;

    return axios.post(`https://624b52c271e21eebbcf0b4ba.mockapi.io/orders`, data);
};

const Cart = () => {
    const router = useRouter()
    const cartList = useSelector(state => state.cart);
    //  console.log("object", cartList.products.length)
    const [orderId, setOrderId] = useState(0)
    const handleCompleteOrder = (e) => {
        const createdAt = {
            createdAt: new Date().toLocaleString()
        };
        const finalCart = { ...cartList, ...createdAt };

        addNewOrder(finalCart).then(res => {
            setOrderId(res.data.id);
            e.preventDefault()
            router.push(`/checkout/${res.data.id}`)
        });
    }

    return (
        <div className={styles.container}>
            {(cartList.products.length === 0) ? (
                <div className={styles.emptyCartContainer}>
                    <img src="img/emptyCart.png" className={styles.emptyCart} alt="emptycart" />
                    <h2>Your Cart is <strong>EMPTY</strong> </h2>
                    <p className={styles.emptyCartPara}>Looks like you haven't made your choice yet...</p>
                    <Link href="/" passHref>
                        <button className={styles.button}>Back To Home</button>
                    </Link>
                </div>) :
                (
                    <>
                        <div className={styles.left}>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tr}>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Extras</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.products.map(product => (
                                        <tr className={styles.tr} key={product.id}>
                                            <td>
                                                <div className={styles.imgContainer}>
                                                    <Image
                                                        src={product.img}
                                                        layout="fill"
                                                        objectFit="covert"
                                                        alt="" />
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.name}>{product.name}</span>
                                            </td>
                                            <td>
                                                <span className={styles.extras}>
                                                    {(product.extras.length > 0) ? (product.extras.map(extra => (
                                                        <span key={extra.id}>{extra.text},</span>
                                                    ))) : "No Extras    "}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={styles.price}>{product.price}&euro;</span>
                                            </td>
                                            <td>
                                                <span className={styles.quantity}>{product.quantity}</span>
                                            </td>
                                            <td>
                                                <span className={styles.total}>{product.price * product.quantity}&euro;</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.wrapper}>
                                <h2 className={styles.title}>CART TOTAL</h2>
                                <div className={styles.totalText}>
                                    <b className={styles.totalTextTitle}>Subtotal:</b>{cartList.total}&euro;
                    </div>
                                <div className={styles.totalText}>
                                    <b className={styles.totalTextTitle}>Discount:</b>0.00&euro;
                    </div>
                                <div className={styles.totalText}>
                                    <b className={styles.totalTextTitle}>Total:</b>{cartList.total}&euro;
                    </div>
                                <button className={styles.button} onClick={e => handleCompleteOrder(e)}>CHECKOUT NOW!</button>
                            </div>
                        </div></>)}
        </div>
    )
}

export default Cart;
