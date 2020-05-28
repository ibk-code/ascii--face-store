import React, {useState, useEffect, useLayoutEffect,  createContext, useRef} from 'react';
import IdleTimer from 'react-idle-timer';
import _ from 'lodash';

const ProductContext = createContext();


const ProductContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [dataOnIdle, setDataOnIdle] = useState([]);
    const [catalogueEnd, setCatalogueEnd] = useState(false);
    const [emptyreturn, setEmptyReturn] = useState('');
    const [datafetchedOnIdle, setDataFetchedOnIdle] = useState(false);
    const [advertStatus, setAdvertStatus] = useState(false);
    const [scrollStatus, setScrollStatus] = useState(false);


    const idleTimerRef = useRef(null);

    const fetchData = (startPage, format) => {
        setAdvertStatus(false)
        const url = `http://localhost:3000/api/products?_page=${startPage}&_limit=15&_sort=${format}`

        return fetch(url);
    }

    const getNextData = async () => {
        // if(emounted){
            console.log("yay i am now idle")
                try{
                    if (!catalogueEnd) {
                        if (dataOnIdle.length < 1) {
                            console.log("fetching");     
                            let pagefrom = page + 1, sorted = sort;
                            let response = await fetchData(pagefrom, sorted)
                            
                            let data = await response.json();
                            if (data.length > 0) {
                                setDataOnIdle(data)
                                setPage(pagefrom)
                                setDataFetchedOnIdle(true)
                            }else{
                            setEmptyReturn('Data is empty')
                            setDataFetchedOnIdle(true)
                            }
                        }else{
                            return
                        }
                    }
                }catch(e){
                    console.log(e)
                }

    }

    const fetchedWhenIdle = (setloading) => {
        console.log("fetched on idle");
        if(dataOnIdle.length >= 1) {
                setProducts(prevState => _.uniqBy([...prevState, ...dataOnIdle], 'id'))
                setDataOnIdle([])
                setDataFetchedOnIdle(false); 
            setAdvertStatus(true)
            setloading(false);
        }else if(emptyreturn === 'Data is empty'){
            setCatalogueEnd(true)
            setDataFetchedOnIdle(false); 
            setloading(false);
        }
    }

    const activeScrolling = async (setloading) => {
        console.log("fetched on scroll");
        try{
            if (!catalogueEnd) {
                let pagefrom = page + 1, sorted = sort;
                let response = await fetchData(pagefrom, sorted)
                
                let data = await response.json();
                if (data.length > 0) {
                    setProducts(prevState => _.uniqBy([...prevState, ...data], 'id')) 
                    setPage(pagefrom)
                    setloading(false)
                    setAdvertStatus(true)
                }else{
                   setCatalogueEnd(true) 
                   setloading(false)
                }
                // setEmounted(false);
            }
        }catch(e){
            console.log(e)
        }
    }

    const addNewDataOnScroll = (setloading) => {
        console.log("YOU SCROLLED TO WHERE I WANT");
        if (datafetchedOnIdle === true) {
            fetchedWhenIdle(setloading);
        }else{
            activeScrolling(setloading);
        }
    }
  
    return (
        <ProductContext.Provider value={{products, setProducts, setLoading, sort, setSort, setPage, loading, addNewDataOnScroll, catalogueEnd, setCatalogueEnd, advertStatus, setAdvertStatus, fetchData, page, setDataOnIdle, scrollStatus, setScrollStatus}} >
            <IdleTimer 
                ref={idleTimerRef}
                onIdle={getNextData}
                timeout={5 * 1000}
            >
                {props.children}
            </IdleTimer>
        </ProductContext.Provider>
    )
}

export {ProductContext, ProductContextProvider};