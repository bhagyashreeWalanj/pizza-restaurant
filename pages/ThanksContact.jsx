import styles from '../styles/contact.module.scss'
import Link from 'next/link';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'


const ThanksContact = () => {
    return (
        <div>
            <div className={styles.thankYouContainer}>
                <h1>Thank you !</h1>
                <IoMdCheckmarkCircleOutline className={styles.checkmark} />
                <div className={styles.desc}><p>Thank you very much for filling out our form.</p>
                    <p>We will get in touch with you soon !! :)</p></div>
                <Link href="/" passHref>
                    <button className={styles.button}>Back To Home</button>
                </Link>
            </div>
        </div>
    )
}

export default ThanksContact
