import React, {useState, useEffect} from 'react'

const useInfiniteScroll = (callback) => {
    const [loadMoreFetching, setLoadMoreFetching] = useState(false);
    const [productLoaded, setproductLoaded] = useState(false);
  
    useEffect(() => {
        if (loadMoreFetching) {
            callback(); 
        }
    }, [loadMoreFetching]);
  
    const handleScroll = (scroll, catalogue) => {
        if (scroll) {

            let lastCardOffset = document.body.offsetHeight;

            let pageOffset = window.innerHeight + window.scrollY;

            if (pageOffset >= lastCardOffset){
                if (document.getElementsByClassName('pg-card')) {
                    if (!catalogue) {
                        setLoadMoreFetching(true);  
                    }else{
                        setLoadMoreFetching(false);
                    }
                }
            }
            else{
                return;
            }
        }
    }
  
    return {loadMoreFetching, setLoadMoreFetching, productLoaded, setproductLoaded, handleScroll};
  };
  
  export default useInfiniteScroll;
  