import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';
import SideBar from './SideBar';

const Layout = ({ children }) => {

    return (
        <div className={styles.container}>
            <SideBar />
            <Container className={styles.main}>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
