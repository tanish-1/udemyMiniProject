import React, {useState} from 'react';
import './MainNavigation.css'
import {Link} from "react-router-dom";
import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer.jsx";
import NavLinks from "./NavLinks.jsx";
import Backdrop from "../UIElements/Backdrop.jsx";
const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const openDrawer = () => {
        setDrawerIsOpen(true)
    }
    const closeDrawer = () => {
        setDrawerIsOpen(false)
    }
    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
            {drawerIsOpen && (
                <SideDrawer>
            <nav className="main-navigation__drawer-nav">
                <NavLinks />
            </nav>
        </SideDrawer>
            )}
      <MainHeader>
          <button className="main-navigation__menu-btn" onClick={openDrawer}>
              <span></span>
              <span></span>
              <span></span>
          </button>
          <h1 className="main-navigation__title">
             <Link to = "/">YourPlaces</Link>
          </h1>
          <nav className="main-navigation__header-nav">
            <NavLinks/>
          </nav>
      </MainHeader>
        </>
    );
};

export default MainNavigation;