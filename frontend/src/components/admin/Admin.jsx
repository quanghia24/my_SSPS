import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Admin.css'; // Sử dụng file CSS để tùy chỉnh giao diện
import LeftSideBar from '../Leftsidebar/LeftSideBar';
import Footer from '../NavFooter/Footer';

function MainComponent() {
    return (
        <div>
            <Header />
            <div className="d-flex" style={{ height: 'calc(100vh - 70px)' }}>
                <div className="sidebar" style={{ width: '250px', margin: 0, padding: 0 }}>
                    <LeftSideBar />
                </div>
                <div className="content flex-grow-1" style={{ margin: 0, padding: 0, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default MainComponent;