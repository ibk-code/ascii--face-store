import React, {useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import { withRouter } from "react-router";

const MyNavbar = props => {
    const {location} = props

    return(
        <React.Fragment>
            <Navbar expand="lg" fixed="top" className="shadow pg-light pr-5 pl-5">
                <Navbar.Brand href="#home"><span className="logo">{"PG):"}</span></Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">      
                    <Nav activeKey={location.pathname}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/product">Product</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                        <Nav.Link href="/login">Login/SignUp</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="pg-mobile__toggle">
                    <Nav.Link href="#" className="cart">
                        <span className="cart-ind">0</span>
                        <i className="fas fa-shopping-basket"></i>
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
            </Navbar>
        </React.Fragment>
    )
}

const HeaderNav = withRouter(MyNavbar);

export default HeaderNav;