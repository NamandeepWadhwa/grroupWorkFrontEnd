import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import HomeContent from './Home';
import SideBar from "./SideBar"
import {Outlet} from "react-router-dom";
import Freeboard from '../pages/freeboard';
import styles from "@/styles/Home.module.css";

const Layout = () => {
    const [activeSection, setActiveSection] = useState('home');

    const renderContent = () => {
        switch (activeSection) {
            case 'home':
                return <HomeContent />;
            case 'freeboard':
                return <Freeboard />;
            default:
                return <HomeContent />;
        }
    };

    return (
        <>

            <div className={styles.container}>
                <SideBar setActiveSection={setActiveSection} />
                <Container className={styles.main}>
                    {renderContent()}
                </Container>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
