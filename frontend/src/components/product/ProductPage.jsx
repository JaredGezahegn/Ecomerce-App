import React, {useState, useEffect} from 'react';
import RelatedProducts from './RelatedProduct';
import ProductPagePlaceHolder from './ProductPagePlaceHolder';
// import {BASE_URL} from "../../api"
import { useParams } from "react-router-dom";
import api from "../../api"

const ProductPage = () => {

    const {slug}=useParams();
    const [product, setProduct]= useState({});
    const [similarProducts, setSimilarProducts]= useState([]);
    const [loading, setLoading]= useState(false);

    useEffect(()=>{
        setLoading(true);
        api.get(`product_detail/${slug}`)
        .then(res=> {
            console.log(res.data)
            setProduct(res.data);
            setSimilarProducts(res.data.similar_products);
            setLoading(false);
        })
        .catch(err=> {
            console.log(err.message)
            setLoading(false);
        })
    },[slug])

    if (loading){
        return <ProductPagePlaceHolder />
    }
    return (
        <div>
            
             <section className="py-3">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img className="card-img-top mb-5 mb-md-0" src={product.thumbnail}
                                alt={product.name} />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: BST-498</div>
                            <h1 className="display-5 fw-bolder">{product.name}</h1>
                            <div className="fs-5 mb-5">
                                {/* <span className="text-decoration-line-through">$45.00</span> */}
                                <span>{`$${product.price}`}</span>
                            </div>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in neque et nisl.</p>
                            <div className="d-flex">
                               
                                <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  
            </section>
            <RelatedProducts products ={similarProducts} />
        </div>
    );
}

export default ProductPage;
