import HomeCard from './HomeCard.jsx';

const CartContainer = ({products}) => {
    return (
        <section className="py-5" id="shop">
            <h4 style={{textAlign: "center"}}>Our Products</h4>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row justify-content-center">
            {products.map(product => <HomeCard key={product.id} product={product} />)}
                    {/* Product cards will go here */}
                    
                </div>
            </div>
        </section>
    );
}
export default CartContainer;