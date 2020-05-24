import React from 'react';
import MyNavbar from './MyNavbar';

const Header = props => {

    return (
        <React.Fragment>
            <header>
                <MyNavbar />
                <div className="banner">
                    <div className="header-content container">
                        <h1>{"Welcome to (ノ・∀・)ノ face store"}</h1>
                        <p>We sell at affordable prices, 30% off your first purchase</p>
                        <img src="./img/down.svg" alt="load" className="down" />
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;