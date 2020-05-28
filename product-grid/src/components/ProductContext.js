import React, {useState, createContext, useRef} from 'react';
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

    //fetch product from api
    const fetchData = (startPage, format) => {
        setAdvertStatus(false)
        const url = `http://localhost:3000/api/products?_page=${startPage}&_limit=15&_sort=${format}`

        return fetch(url);
    }

    //function to fetch data when user is idle
    const getNextData = async () => {
            console.log("i am now idle")
                try{
                    if (!catalogueEnd) {
                        if (dataOnIdle.length < 1) {     
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

    //function to run if next data as been fetched when user is idle
    const fetchedWhenIdle = (setloading) => {
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

    //function to run if next data as fetch when user is actively scrolling
    const activeScrolling = async (setloading) => {
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
            }
        }catch(e){
            console.log(e)
        }
    }

    //function onscroll when user reach end of page
    const addNewDataOnScroll = (setloading) => {
        if (datafetchedOnIdle === true) {
            fetchedWhenIdle(setloading);
        }else{
            activeScrolling(setloading);
        }
    }
  
    return (
        <ProductContext.Provider value={{products, setProducts, setLoading, sort, setSort, setPage, loading, addNewDataOnScroll, catalogueEnd, setCatalogueEnd, advertStatus, setAdvertStatus, fetchData, page, setDataOnIdle, scrollStatus, setScrollStatus, datafetchedOnIdle, setDataFetchedOnIdle}} >
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