import React from 'react';

const Advert = () => {

    return(
        <React.Fragment>
            <div>
                <p>But first, a word from our sponsors:</p> <script>document.write('<img className="ad" src="http://localhost:3000/ads/?r=' + Math.floor(Math.random()*1000) + '"/>');</script>
            </div>
        </React.Fragment>
    )
}

export default Advert;
// http://localhost:3000/ads/?r=900  