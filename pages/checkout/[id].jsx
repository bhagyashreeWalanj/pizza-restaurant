import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/checkout.module.css';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import Image from 'next/image';
import axios from 'axios';
import { emptyCart } from '../../redux/cartSlice';

const checkout = ({ cart }) => {
    const status = 0;
    const dispatch = useDispatch();

    const statusClass = (index) => {
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    }

    useEffect(() => {
        dispatch(emptyCart())
    })

    return (
        <div>
            <div className={styles.centerContainer}>
                <IoMdCheckmarkCircleOutline className={styles.checkmark} />
                <h1 className={styles.title}>Thank you for your order</h1>
                <p className={styles.orderNo}>Order Number: 123455</p>
                <p>
                    Delivery of healthy food is the best solution for business people.
                    Who wants to eat right, look healthy and work productively all day.
             </p>
                <button className={styles.button}>View order status</button>
                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <Image src="/img/paid.png" width={30} height={30} alt="" />
                        <span>Payment</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src="/img/bake.png" width={30} height={30} alt="" />
                        <span>Preparing</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src="/img/bike.png" width={30} height={30} alt="" />
                        <span>On the way</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src="/img/delivered.png" width={30} height={30} alt="" />
                        <span>Delivered</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>

                <div className={styles.left}>
                    <div className={styles.row}>
                        <table className={styles.table} cellSpacing="20" cellPadding="20">
                            <thead>
                                <tr className={styles.tr}>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Extras</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.products.map((product, index) => (
                                    <tr className={styles.tr} key={product.id}>
                                        <td>{(index + 1)}</td>
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
                                <tr className={styles.breakline}>

                                </tr>
                                <tr>

                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td><td>-</td>
                                    <td>SUBTOTAL</td>
                                    <td><span>{cart.quantity}</span></td>
                                    <td><span className={styles.total}>{cart.total}&euro;</span></td>
                                </tr>
                                <tr className={styles.breakline}>
                                    <td></td> <td></td>
                                    <td></td>
                                    <td></td><td></td>
                                    <td><span>Shipping</span></td>
                                    <td><span className={styles.total}>{1.20}&euro;</span></td>
                                </tr>
                                <tr>
                                    <td></td> <td></td>
                                    <td></td>
                                    <td></td><td></td>
                                    <td><span>TOTAL</span></td>
                                    <td><span className={styles.total}>{cart.total + 1.20}&euro;</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className={styles.right}>
                    <div className={styles.wrapper}>
                        <h2 className={styles.title}>SUMMARY : </h2>
                        <div className={styles.totalText}>
                            <b className={styles.totalTextTitle}>ORDER : #</b>{cart.id}
                        </div>
                        <div className={styles.totalText}>
                            <b className={styles.totalTextTitle}>Order Date:</b>{cart.createdAt}
                        </div>
                        <div className={styles.totalText}>
                            <b className={styles.totalTextTitle}>Order Total:</b>{cart.total + 1.20}&euro;
                        </div>

                    </div>
                    <div className={styles.wrapper}>
                        <h2>SHIPPING ADDRESS : </h2>
                        <p> Guerickestr 11, 1 OZ, 10587, Berlin</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export const getServerSideProps = async ({ params }) => {
    let errorCode = false;
    try {
        const res = await axios.get(`https://624b52c271e21eebbcf0b4ba.mockapi.io/orders/${params.id}`)
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
                cart: res.data
            }
        };

    } catch (error) {
        console.log(error);
    }


};

export default checkout
