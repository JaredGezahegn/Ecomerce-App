import { Link } from "react-router-dom"

const CartSummary = () => {
    return (
        <div className="col-md-4 align-self-start">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Cart Summary</h5>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>$40.00</span>
                    </div>
                    <div className="d-flex justify-content-betweeb">
                        <span>Tax:</span>
                        <span>$44.00</span>
                    </div>
                    <div className="d-flex justify-content-betweeb mb-3">
                        <span>Total:</span>
                        <strong>$44.00</strong>
                    </div>
                    <Link to="/checkout">
                        <button
                            className="btn btn-primary w-100"
                            style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}>Proceed to Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartSummary