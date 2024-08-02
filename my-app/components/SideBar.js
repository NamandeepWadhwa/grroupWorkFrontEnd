import React, { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/Home.module.css';
import { removingUser } from '@/lib/removingUser';
import { useRouter } from 'next/router';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = ({ setActiveSection }) => {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const noSideBarPaths = ['/user/login'];

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            removingUser();
            window.location.href = '/user/login';
        }
    };

    return (
        <div className={cx(styles.sidebar, { [styles.sidebarClosed]: !isOpen })}>
            <button className={styles.sidebar__button} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            {!noSideBarPaths.includes(router.pathname) && (
                <Container>
                    <div className={styles.sidebar__listItem}>
                        <CSSTransition
                            in={isOpen}
                            timeout={200}
                            classNames={{
                                enter: styles.fadeEnter,
                                enterActive: styles.fadeEnterActive,
                                exit: styles.fadeExit,
                                exitActive: styles.fadeExitActive
                            }}
                            unmountOnExit
                        >
                            <div>
                                <div className={styles.logoContainer}>
                                    <Link href="/">
                                        <Image
                                            src="/SS_Logo_hd.png"
                                            alt="SNS Logo"
                                            className={styles.logo}
                                            width={500}
                                            height={500}
                                        />
                                    </Link>
                                </div>
                                <div className={styles.navContainer}>
                                    <Nav className={styles.nav}>
                                        <div className={styles.navul}>
                                            <Nav.Link className={styles.navli} as={Link} href="/" onClick={() => setActiveSection('home')}>Home</Nav.Link>
                                            <Nav.Link className={styles.navli} as={Link} href="/profile" onClick={() => setActiveSection('profile')}>Profile</Nav.Link>
                                            <Nav.Link className={styles.navli} as={Link} href="/events" onClick={() => setActiveSection('events')}>Events</Nav.Link>
                                            <Nav.Link className={styles.navli} as={Link} href="/activities" onClick={() => setActiveSection('activities')}>Activities</Nav.Link>
                                            <Nav.Link className={styles.navli} as={Link} href="/freeboard" onClick={() => setActiveSection('freeboard')}>Freeboard</Nav.Link>
                                            <Nav.Link className={styles.navli} as={Link} href="/ask" onClick={() => setActiveSection('ask')}>Ask</Nav.Link>
                                            <Nav.Link className={styles.navli} as={Link} href="/notification" onClick={() => setActiveSection('notifications')}>Notification</Nav.Link>
                                        </div>
                                    </Nav>
                                    <button className={styles.signOutButton} onClick={handleSignOut}>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                </Container>
            )}
        </div>
    );
};

export default SideBar;
