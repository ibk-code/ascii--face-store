import React, {useEffect, useLayoutEffect, useContext, useRef} from 'react';
import ProductCard from './ProductCard';
import Loader from '../Loader';
import {ProductContext} from '../ProductContext'
import useInfiniteScroll from '../useInfiniteScroll';
import SortSection from '../main/SortSection'

const Products = props => {
    const {loading, setLoading, products, setProducts, addNewDataOnScroll, catalogueEnd, setCatalogueEnd, advertStatus, setAdvertStatus, sort, page, fetchData, setSort, setDataOnIdle, setPage, scrollStatus, setScrollStatus,  datafetchedOnIdle, setDataFetchedOnIdle} = useContext(ProductContext);
    
    //callback passed to useInfiniteScroll callback
    const fetchMoreListItems = () => {
            addNewDataOnScroll(setLoadMoreFetching);
    }

    
    //Setting Infinite scroll value
    const {loadMoreFetching, setLoadMoreFetching, handleScroll} = useInfiniteScroll(fetchMoreListItems)

    const pg_wrapcard = useRef();
    const parent_wrap = useRef();

    //window scroll function
    const callScroll = () => {
        handleScroll(scrollStatus, catalogueEnd)
    }

    //Load Ad function for getting ads
    const loadAd = () => {
        if (advertStatus) {
            let text = `<div class="pg-card ad"><p>But first, a word from our sponsors:</p><img class="adimg" src="http://localhost:3000/ads/?r=${Math.floor(Math.random()*1000)}"/></div>` 
            let pgCards = Array.from(document.getElementsByClassName('pg-card'));
            if(pgCards.length > 0) {
                const pgLength = pgCards.length / 20;
                for (let j = 0; j < pgLength; j++) {
                    if( j !== 0) {
                        pgCards.forEach((e, i, a) => {
                            if (a[i] === a[(20 * j) - 1]) {
                                if (!e.nextSibling.classList.contains('ad')) {
                                    e.insertAdjacentHTML('afterend', text);
                                }
                            }
                        })
                    } 
                }
            } 
        }
    }

    //Mounting scroll listener to window
    useEffect(() => {
        window.addEventListener('scroll', callScroll);
        return () => window.removeEventListener('scroll', callScroll);
    }, [scrollStatus]);

    //Mounting Ad feature function
    useLayoutEffect(() => {
        loadAd();
     }, [advertStatus])
     
     //function to sort products
     const sortProduct = (e) => {
         setSort(e.target.value);
         setPage(1)
         setProducts([]);
         setCatalogueEnd(false)
         setDataOnIdle([])
         setDataFetchedOnIdle(false);
         setLoadMoreFetching(false);
         setAdvertStatus(false);
         setScrollStatus(false);
     }
     
     //function for the first data fetch
     useEffect(() => {
         const fetchProd = async () => {
             try{
                 setLoadMoreFetching(false);
                 setLoading(true)
                 setAdvertStatus(false)
                 const response = await fetchData(page, sort);
 
                 const data = await response.json()
 
                 setProducts(data)
                 setLoading(false)
             }catch(e){
                 console.log(e)
                 return 'Something went wrong'
             }
             setScrollStatus(true)
         }
         fetchProd()
     }, [sort])
 

    const load = <Loader />

    const loadProducts =  <div className="d-flex        flex-wrap justify-content-start" ref={parent_wrap} id="pg-wrapcard">
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
            <div className="pg-sort">
                <SortSection changeEvent={sortProduct}/>
            </div>
           <div>
               {
                   loading? load : loadProducts
               }
           </div>
            <div>              
                {
                    loadMoreFetching && !catalogueEnd && <div className="pt-4 d-block mx-auto pl-4">
                        Loading <img src="./img/more.svg" alt="load more loader"/>
                    </div>
                }
            </div>
            <p className="text-center">{catalogueEnd && "End of Catalogue"}</p>
        </React.Fragment>
    )
}

export default Products;