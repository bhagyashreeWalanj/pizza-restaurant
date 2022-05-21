import styles from '../styles/contact.module.scss'
import Link from 'next/link';
import Image from 'next/image';


const ComingSoon = () => {
    return (
        <div>
            <div className={styles.thankYouContainer}>
                <h1>Coming Soon!</h1>
                <Image src="/img/comingSoon.png" layout="fixed"
                    className={styles.emptyCart}
                    width="200" height="200"
                    alt="comingSoon" />
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
