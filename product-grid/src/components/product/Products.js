import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import ProductCard from './ProductCard';
import Loader from '../Loader';
import {ProductContext} from '../ProductContext'
import useInfiniteScroll from '../useInfiniteScroll';

const Products = props => {
    const fetchMoreListItems = () => {
            addNewDataOnScroll(setLoadMoreFetching);
    }

    const {loading, products, addNewDataOnScroll, catalogueEnd} = useContext(ProductContext);

    const [loadMoreFetching, setLoadMoreFetching, productLoaded, setproductLoaded, handleScroll] = useInfiniteScroll(fetchMoreListItems)

    const pg_wrapcard = useRef();

    const callScroll = () => {
        handleScroll(pg_wrapcard.current)
    }

    // useEffect(() => {
    //     if(products > 0) {
    //         setproductLoaded(true);
    //     }
    // }, [])

    useEffect(() => {
        window.addEventListener('scroll', callScroll);
        return () => window.removeEventListener('scroll', callScroll);
    }, []);

    const load = <Loader />

    const loadProducts =  <div className="d-flex        flex-wrap justify-content-start" id="pg-wrapcard">
    {
      products.map((item, index) => {
            if (index === (products.length - 1)) {
                return <ProductCard key={item.id} face={item.face} size={item.size} price={item.price} date={item.date} ref={pg_wrapcard}/>
            }else{
                return <ProductCard key={item.id} face={item.face} size={item.size} price={item.price} date={item.date}/>
            }
      })
    }
    </div>
    

    return(
        <React.Fragment>
           <div>
               {
                   loading? load : loadProducts
               }
           </div>
            <div>              
                {
                    loadMoreFetching && <div className="pt-4 d-block mx-auto pl-4">
                        Loading <img src="./img/more.svg" alt="load more loader"/>
                    </div>
                }
            </div>
            <p className="text-center">{catalogueEnd && "End of Catalogue"}</p>
        </React.Fragment>
    )
}

export default Products;