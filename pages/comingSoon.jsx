import styles from '../styles/contact.module.scss'
import Link from 'next/link';


const ComingSoon = () => {
    return (
        <div>
            <div className={styles.thankYouContainer}>
                <h1>Coming Soon!</h1>
                <img src="img/comingSoon.png" className={styles.emptyCart} style={{ 'width': '15rem' }} alt="comingSoon" />
                <Link href="/" passHref>
                    <button className={styles.button}
                        style={{ 'marginBottom': '10rem', 'marginTop': '3rem' }}
                    >Back To Home</button>
                </Link>
            </div>
        </div>
    )
}

export default ComingSoon
