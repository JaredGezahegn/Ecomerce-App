import Header from './Header';
import CardContainer from './CardContainer';
import api from '../../api';
import React, { useEffect, useState } from "react";
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import Error from '../ui/Error';

const Homepage = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(function(){
        setLoading(true)
    api.get("products")
    .then(res =>{console.log(res.data)
             setProducts(res.data);
             setLoading(false); 
    })
   
    .catch(err =>{
        console.log(err.message)
        setLoading(false);
        setError(err.message);
    })
    
    }, [])

    return (
        <>
            <Header />

            {loading && <PlaceHolderContainer />}

            {error && <Error error={error} />}

            {!loading && !error && <CardContainer products={products} />}
        </>

    );

}
export default Homepage;