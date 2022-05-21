import React from 'react'
import styles from '../styles/contact.module.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Contact = () => {
    const { register, handleSubmit } = useForm()
    const [data, setData] = useState('')
    const router = useRouter()

    const handleDispatch = (data) => {
        setData(JSON.stringify(data));
        router.push(`/thanksContact/`)
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <header className={styles.pageHeader}>
                    <h1>Contact Us!</h1>
                </header>
                <form className={styles.contactForm}
                    onSubmit={handleSubmit((data) => handleDispatch(data))}
                >
                    <p>
                        <label className={styles.label}>
                            {' '}
              Your Name (required)
              <br />
                            <span className={styles.inputSpan}>
                                <input
                                    type="text"
                                    placeholder={'Your Name'}
                                    defaultValue=""
                                    width="40"
                                    {...register('fullName')}
                                    aria-required="true"
                                    aria-invalid="false"
                                />
                            </span>
                        </label>
                    </p>

                    <p>
                        <label className={styles.label}>
                            Your Email (required)
              <br />
                            <span className={styles.inputSpan}>
                                <input
                                    {...register('emailId')}
                                    type="email"
                                    // name="your-email"
                                    placeholder={'Your EmailId'}
                                    //value=""
                                    width="40"
                                    aria-required="true"
                                    aria-invalid="false"
                                />
                            </span>
                        </label>
                    </p>
                    <p>
                        <label className={styles.label}>
                            {' '}
              Subject
              <br />
                            <span className={styles.inputSpan}>
                                <input
                                    {...register('subject')}
                                    type="text"
                                    placeholder={'Your Subject'}
                                    width="40"
                                    aria-required="true"
                                    aria-invalid="false"
                                />
                            </span>
                        </label>
                    </p>
                    <p>
                        <label className={styles.label}>
                            {' '}
              Subject
              <br />
                            <span className={styles.inputSpan}>
                                <textarea
                                    {...register('aboutYou')}
                                    placeholder="About you"
                                    cols={40}
                                    rows={10}
                                    aria-invalid="false"
                                ></textarea>
                            </span>
                        </label>
                    </p>
                    <input type="submit" className={styles.submitBtn} />
                </form>
            </div>
        </div>
    )
}

export default Contact;
