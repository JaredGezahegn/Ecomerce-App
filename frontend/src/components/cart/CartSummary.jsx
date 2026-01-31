import { Link } from "react-router-dom"

const CartSummary = ({ cartTotal, tax }) => {

    const safeCartTotal = Number(cartTotal) || 0
    const safeTax = Number(tax) || 0

    const subTotal = safeCartTotal.toFixed(2)
    const cartTax = safeTax.toFixed(2)
    const total = (safeCartTotal + safeTax).toFixed(2)

    return (
        <div className="col-md-4 align-self-start">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Cart Summary</h5>
                    <hr />

                    <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>${subTotal}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <span>Tax:</span>
                        <span>${cartTax}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <span>Total:</span>
                        <strong>${total}</strong>
                    </div>

                    <Link to="/checkout">
                        <button
                            className="btn btn-primary w-100"
                            style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
                        >
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartSummary
