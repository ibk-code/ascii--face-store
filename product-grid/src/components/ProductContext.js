import React, {useState, useEffect, createContext} from 'react';

const ProductContext = createContext();

const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    const [loading, setLoading] = useState(false)

    const fetchProduct = () => {
        const url = `http://localhost:3000/api/products?_page=1&_limit=15&_sort=${sort}`

        setLoading(true)

        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(sort);  
                console.log(json)
                setProducts(json);
                setLoading(false)
            })
    }

    const sortProduct = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {
        fetchProduct()
    }, [sort])
    

    return (
        <ProductContext.Provider value={{products, fetchProduct, sortProduct, sort, loading}} >
            {children}
        </ProductContext.Provider>
    )
}

export {ProductContext, ProductContextProvider};