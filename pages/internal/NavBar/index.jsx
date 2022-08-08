import styles from './NavBar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function NavBar(props) {
    const [showNavBar, setShowNavBar] = useState(false);
    useEffect(() => {
        if (localStorage && localStorage.getItem('userName')) {
            setShowNavBar(true);
        } else {
            setShowNavBar(false);
        }
    })
    const router = useRouter();
    let isActive = (path) => {
        return router.pathname.split('/').indexOf(path) != -1;
    }

    let onLogout = () => {
        localStorage.clear();
        router.push('/internal/LoginPage')
    }
    return (

        <div className={styles.container}>
            <div className={styles.tab}>
                {
                    showNavBar ?
                        <>
                            <div className={styles.left}>
                                <Link href="/internal/Feeds">
                                    <div className={isActive('Feeds') ? styles.active : styles.inactive}>Feed</div>
                                </Link>
                            </div>
                            <div className={styles.right}>
                                <Link href="/internal/RelatedFeeds">
                                    <div className={isActive('RelatedFeeds') ? styles.active : styles.inactive}>Referred Feed</div>
                                </Link>
                            </div>
                            <div className={styles.rightButton}
                                onClick={onLogout}>Logout ({localStorage.getItem('userName')})</div>
                        </>
                        : <div><b>Trip Collaborator</b></div>
                }
            </div>
            <div>
                {props.children}
            </div>
        </div>

    )
}
