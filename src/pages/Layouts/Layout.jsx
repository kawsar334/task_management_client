import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Outlet, useLocation } from "react-router-dom";
import  Footer  from '../../components/Footer';
import Products from '../../components/producs/Products';
import { ThemeContext } from '../../ThemeProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../context/AuthProviders';
import { ToastContainer } from 'react-toastify';
const Layout = () => {
      const { user, signOutUser } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    useEffect(() => {
        AOS.init({
            duration: 1500, 
            easing: "ease-in-out", 
            once: true, 
        });
    }, []);
    const path = useLocation().pathname
   
    return (
        <div className={isDarkMode ? "bg-mn text-white" : "bg-white text-mn"}>

            <Navbar />
            <Outlet />
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Layout;
