import HomeCard from "../Home/HomeCard";

const RelatedProducts = ({ products }) => {

    if (!Array.isArray(products) || products.length === 0) {
        return null; // no related products
    }

    return (
        <section className="py-3 bg-light">
            <div className="container px-4 px-lg-5 mt-3">
                <h2 className="fw-bolder mb-4">Related Products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                    {products.map(product => (
                        <HomeCard key={product.id} product={product} />
                    ))}

                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
