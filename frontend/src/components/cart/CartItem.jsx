const CartItem = ({item, updateQuantity, removeItem}) => {
    return (
        <div className="col-md-12">
            {/* {cart Items} */}
            <div
                className="cart-item d-flex align-items-center mb-3 p-3"
                style={{ background: '#f8f9fa', borderRadius: '8px' }} >
                <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-0 text-muted">${item.product.price}</p>
                    <p className="mb-0 text-success">Total: ${item.total}</p>
                </div>
                <div className="d-flex align-items-center">
                    <input
                        type="number"
                        className="form-control me-3"
                        value={item.quantity}
                        min="1"
                        step="1"
                        onChange={(e) => {
                            const value = Math.max(1, Number(e.target.value) || 1)
                            updateQuantity(item.id, value)
                        }}
                        style={{ width: '70px' }}
                    />

                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            {/* {add more cart items here} */}
        </div>
    )
}

export default CartItem