import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard';
import Loader from '../Loader';
import {ProductContext} from '../ProductContext'

const Products = props => {
    const {loading, products} = useContext(ProductContext);

    const load = <Loader />

    const loadProducts =  <div className="d-flex        flex-wrap justify-content-start">
    {
      products.map(item => {
        return <ProductCard key={item.id} face={item.face} size={item.size} price={item.price} date={item.date}/>
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
        </React.Fragment>
    )
}

export default Products;