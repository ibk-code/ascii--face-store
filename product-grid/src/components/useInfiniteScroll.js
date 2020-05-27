import React, {useState, useEffect} from 'react'

const useInfiniteScroll = (callback) => {
    const [loadMoreFetching, setLoadMoreFetching] = useState(false);
    const [productLoaded, setproductLoaded] = useState(false);
  
    useEffect(() => {
        if (loadMoreFetching) {
            console.log('called back')
            callback(); 
            console.log("Got data") 
        }
    }, [loadMoreFetching]);
  
    const handleScroll = (elem) => {
        if (elem !== undefined || null) {
            // let lastCard = elem;

            let lastCardOffset = document.body.offsetHeight;

            let pageOffset = window.innerHeight + window.scrollY;

            let bottomSet = 5

            if (pageOffset >= lastCardOffset){
                // console.log("Hello World")
                setLoadMoreFetching(true);
            }
            else{
                console.log("hello")
            }
        }
    }
  
    return [loadMoreFetching, setLoadMoreFetching, productLoaded, setproductLoaded, handleScroll];
  };
  
  export default useInfiniteScroll;
  