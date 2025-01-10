import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import AppFooter from "./AppFooter.jsx";

const Layout = (props) => {
    return (
        <>
            <AppNavbar/>
            {/* eslint-disable-next-line react/prop-types */}
                {props.children}
            <AppFooter/>
        </>
    );
};

export default Layout;