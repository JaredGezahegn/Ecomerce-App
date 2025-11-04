import HomeCard from './HomeCard.jsx';

const CartContainer = () => {
    return (
        <section className="py-5" id="shop">
            <h4 style={{textAlign: "center"}}>Our Products</h4>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row justify-content-center">
                    {/* Product cards will go here */}
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                    <HomeCard />
                </div>
            </div>
        </section>
    );
}
export default CartContainer;