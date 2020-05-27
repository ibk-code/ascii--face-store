import React, {useState, useEffect, useLayoutEffect,  createContext, useRef} from 'react';
import IdleTimer from 'react-idle-timer';
import _ from 'lodash';
import chunk from 'lodash/chunk'

const ProductContext = createContext();


const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [dataOnIdle, setDataOnIdle] = useState([]);
    const [catalogueEnd, setCatalogueEnd] = useState(false);
    const [emptyreturn, setEmptyReturn] = useState('');
    const [datafetchedOnIdle, setDataFetchedOnIdle] = useState(false);


    const idleTimerRef = useRef(null);

    const fetchData = (startPage, format) => {
        const url = `http://localhost:3000/api/products?_page=${startPage}&_limit=20&_sort=${format}`

        return fetch(url);
    }

    // const fetchProduct = () => {
    //     setLoading(true)
    //     fetchData(setProducts, page, sort)
    // }

    const sortProduct = (e) => {
        setSort(e.target.value);
        setDataOnIdle([])
        setPage(1)
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
        // }else{
        //     return

    }

    const fetchedWhenIdle = (setloading) => {
        console.log("fetched on idle");
        if(dataOnIdle.length >= 1) {
            setProducts(prevState => _.uniqBy([...prevState, ...dataOnIdle], 'id'))
            setDataOnIdle([])
            setDataFetchedOnIdle(false); 
        }else if(emptyreturn === 'Data is empty'){
            setCatalogueEnd(true)
            setDataFetchedOnIdle(false); 
        }
        
        setTimeout(() => {
            setloading(false);
        }, 1000);
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
                }else{
                   setCatalogueEnd(true) 
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

    useEffect(() => {
        const fetchProd = async () => {
            try{
                setLoading(true)
                const response = await fetchData(page, sort);

                const data = await response.json()
                console.log(data)

                setProducts(data)
                setLoading(false)
            }catch(e){
                console.log(e)
                return 'Something went wrong'
            }
        }

        fetchProd()
    }, [sort])

    
    return (
        <ProductContext.Provider value={{products, sortProduct, sort, loading, addNewDataOnScroll, catalogueEnd}} >
            <IdleTimer 
                ref={idleTimerRef}
                onIdle={getNextData}
                timeout={5 * 1000}
            >
                {children}
            </IdleTimer>
        </ProductContext.Provider>
    )
}

export {ProductContext, ProductContextProvider};