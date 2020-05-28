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
  
    const handleScroll = (scroll, catalogue) => {
        if (scroll) {
            // let lastCard = elem;

            let lastCardOffset = document.body.offsetHeight;

            let pageOffset = window.innerHeight + window.scrollY;

            if (pageOffset >= lastCardOffset){
                if (document.getElementsByClassName('pg-card')) {
                    console.log("This is the problem")
                    if (!catalogue) {
                        setLoadMoreFetching(true);  
                    }else{
                        setLoadMoreFetching(false);
                    }
                }
            }
            else{
                console.log("hello")
            }
        }
    }
  
    return [loadMoreFetching, setLoadMoreFetching, productLoaded, setproductLoaded, handleScroll];
  };
  
  export default useInfiniteScroll;
  