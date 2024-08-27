import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';
import SideBar from './SideBar';

const Layout =(props) => {

    return (
      <>
        <SideBar />
        <div className='absolute top-24  w-full h-full lg:top-16'>{props.children}</div>
      </>
    );
};

export default Layout;
