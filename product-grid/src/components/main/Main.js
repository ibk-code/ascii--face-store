import React from 'react';
import Products from '../product/Products'

const Main = props => {

    return (

        <React.Fragment>
            <main id="main">
                <div className="container">
                    <div>
                        <Products />
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Main;