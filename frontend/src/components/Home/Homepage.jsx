import Header from './Header';
import CardContainer from './CardContainer';
import SearchFilter from './SearchFilter';
import { api } from '../../utils/api';
import React, { useEffect, useState } from "react";
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import Error from '../ui/Error';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        sortBy: ''
    });

    useEffect(() => {
        const cartCode = localStorage.getItem("cart_code");
        if (!cartCode) {
            const randomValue = Math.random().toString(36).substring(2, 12);
            localStorage.setItem("cart_code", randomValue);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = () => {
        setLoading(true);
        setError("");

        // Build query params
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category && filters.category !== 'all') params.append('category', filters.category);
        if (filters.sortBy) params.append('sort', filters.sortBy);

        const queryString = params.toString();
        const endpoint = queryString ? `products?${queryString}` : 'products';

        api.get(endpoint)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
                setError(err.message);
            });
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <Header />
            <SearchFilter onFilterChange={handleFilterChange} />

            {loading && <PlaceHolderContainer />}
            {error && <Error error={error} />}
            
            {!loading && !error && products.length === 0 && (
                <div className="no-results">
                    <i className="bi bi-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}
            
            {!loading && !error && products.length > 0 && <CardContainer products={products} />}
        </>
    );
};

export default Homepage;