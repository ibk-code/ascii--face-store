import React, {useEffect} from 'react';
import Header from './header/Header';
import Main from './main/Main';
import AOS from 'aos';
import '../../node_modules/aos/dist/aos.css';
import {ProductContextProvider} from './ProductContext';
import {Link} from 'react-router-dom';

const App = props => {
  useEffect(() => {
    AOS.init({
      once:true
    });
  },[])

  return (
    <React.Fragment>
      <ProductContextProvider>
        <Link to="#main" className="skip">skip to content</Link>
        <Header />
        <Main />
      </ProductContextProvider>
    </React.Fragment>
  )
}

export default App;