import React, {useState, useEffect, useContext} from 'react';
import Header from './header/Header';
import Main from './main/Main';
import AOS from 'aos';
import '../../node_modules/aos/dist/aos.css';
import {ProductContext , ProductContextProvider} from './ProductContext';
import {Link} from 'react-router-dom';
import useInfiniteScroll from './useInfiniteScroll';

const App = props => {
  // const [addNewDataOnScroll] = useContext(ProductContext);

  // const [loadMoreFetching, setLoadMoreFetching] = useInfiniteScroll(fetchMoreListItems)

  // const fetchMoreListItems = () => {
  //   setTimeout(() => {
  //     addNewDataOnScroll();
  //     setLoadMoreFetching(false);
  //   }, 2000);
  // }


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