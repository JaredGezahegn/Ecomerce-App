import React, { useState, useEffect } from 'react';
import RelatedProducts from './RelatedProduct';
import ProductPagePlaceHolder from './ProductPagePlaceHolder';
import { useParams } from "react-router-dom";
import { api } from "../../utils/api"
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';

const ProductPage = ({ setNumberCartItems }) => {
    const { t } = useLang();
    const { slug } = useParams();
    const { isAuthenticated, user } = useAuth();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inCart, setInCart] = useState(false)
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const cart_code = localStorage.getItem("cart_code")

    useEffect(() => {
        const handleStorageChange = () => {
            setIsDarkMode(localStorage.getItem("theme") === "dark");
        };

        window.addEventListener('storage', handleStorageChange);
        
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.body.classList.contains('dark-theme'));
        });
        
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            observer.disconnect();
        };
    }, []);

    useEffect(function () {

        if (product.id) {
            api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    console.log(res.data)
                    setInCart(res.data.product_in_cart)
                })

                .catch(err => {
                    console.log(err.message)
                })
        }

    }, [cart_code, product.id])


    const newItem = { cart_code: cart_code, product_id: product.id }

    function add_item() {
        // Check if user is authenticated
        if (!isAuthenticated) {
            // Show login prompt message
            setShowLoginPrompt(true);
            setTimeout(() => setShowLoginPrompt(false), 4000);
            return;
        }

        const newItem = {
            cart_code: cart_code,
            product_id: product.id
        };

        api.post("add_item/", newItem)
            .then(res => {
                console.log(res.data);
                setInCart(true);
                setNumberCartItems(curr => curr + 1);
            })
            .catch(err => {
                console.log("Add item error:", err.message);
            });
    }



    useEffect(() => {
        setLoading(true);
        api.get(`product_detail/${slug}`)
            .then(res => {
                console.log(res.data)
                setProduct(res.data);

                // FIX: handle missing similar_products
                if (res.data.similar_products && Array.isArray(res.data.similar_products)) {
                    setSimilarProducts(res.data.similar_products);
                } else if (res.data.category) {
                    // fetch products from same category
                    api.get(`products?category=${res.data.category}`)
                        .then(resp => {
                            // exclude current product
                            const filtered = resp.data
                                .filter(p => p.id !== res.data.id)
                                .slice(0, 4); // show max 4 related products
                            setSimilarProducts(filtered);
                        })
                        .catch(err => console.log("Failed to fetch related products:", err.message));
                }

                setLoading(false);
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false);
            })
    }, [slug])

    if (loading) {
        return <ProductPagePlaceHolder />
    }

    return (
        <div className={`mainProductContainer ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <section className="py-3">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img className="card-img-top mb-5 mb-md-0" src={product.thumbnail}
                                alt={product.name} />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: BST-498</div>
                            <h1 className={`display-5 fw-bolder ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                                {product.name}
                            </h1>
                            <div className="fs-5 mb-5">
                                <span className={`${isDarkMode ? 'text-warning' : 'text-primary'} fw-bold`}>{product.price} ETB</span>
                            </div>
                            <p className="lead">{product.description || t('product.description')}</p>
                            
                            {/* Login Prompt Alert */}
                            {showLoginPrompt && (
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    Please log in or sign up to add items to your cart
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setShowLoginPrompt(false)}
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}
                            
                            <div className="d-flex">
                                <button className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} flex-shrink-0`} 
                                    type="button"
                                    onClick={add_item}
                                    disabled={inCart}>
                                    <i className="bi-cart-fill me-1"></i>
                                    {inCart ? t('product.addedToCart') : t('product.addToCart')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FIX: only render RelatedProducts if array exists */}
            <RelatedProducts products={similarProducts} />
        </div>
    );
}

export default ProductPage;
