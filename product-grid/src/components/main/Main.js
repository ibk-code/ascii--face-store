import React from 'react';
import SortSection from './SortSection';
import Products from '../product/Products'

const Main = props => {

    return (

        <React.Fragment>
            <main id="main">
                <div className="container">
                    <div className="pg-sort">
                        <SortSection />
                    </div>
                    <div>
                        <Products />
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Main;