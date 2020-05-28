import React from 'react';

const Loader = props => {

    return(
        <React.Fragment>
            <div>
                <div>
                    <img src="./img/loader.svg" className="img-fluid d-block mb-0 mx-auto" alt="Product Loader while getting products"/>
                    <p className="text-center">Loading...</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Loader