import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import BackDrop from './../UIElements/Backdrop';
import NavLinks from './NavLinks';

const MainNavigation = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawer = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawer = () => {
		setDrawerIsOpen(false);
	};

	return (
		<>
			{drawerIsOpen && <BackDrop clickHandler={closeDrawer} />}
			<SideDrawer show={drawerIsOpen} clickHandler={closeDrawer}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>
			<MainHeader>
				<button className="main-navigation__menu-btn" onClick={openDrawer}>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">YourPlaces</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</>
	);
};

export default MainNavigation;
