import CartItem from "./CartItem"
import CartSummary from "./CartSummary"
import { useEffect, useState } from "react"
import api from "../../api"

const CartPage = () => {

    const cart_code = localStorage.getItem("cart_code")
    const [cartitems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0.00)
    const tax = 4.00

    const fetchCart = () => {
        api.get(`get_cart?cart_code=${cart_code}`)
            .then(res => {
                console.log(res.data)
                setCartItems(res.data.items)
                setCartTotal(res.data.sum_total || 0)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const updateQuantity = (itemId, quantity) => {
        api.patch('update_quantity/', {
            item_id: itemId,
            quantity: quantity
        })
        .then(res => {
            console.log(res.data.message)
            fetchCart() // Refresh cart data
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const removeItem = (itemId) => {
        updateQuantity(itemId, 0) // Setting quantity to 0 effectively removes the item
    }

    useEffect(function () {
        fetchCart()
    }, [])

    if (cartitems.length < 1) {
        return (
            <div className="container my-5">
                <div className="alert alert-primary text-center" role="alert">
                    <h4>Your cart is empty</h4>
                    <p>Add some products to get started!</p>
                </div>
            </div>
        )
    }
    return (
        <div className="container my-3 py-3" style={{ height: "80vh", overflow: "scroll" }}>
            <h5 className="mb-4">Shopping Cart</h5>
            <div className="row">
                <div className="col-md-8">
                    {cartitems.map(item => 
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                        />
                    )}
                </div>

                <CartSummary cartTotal={cartTotal} tax={tax} />
            </div>
        </div>
    )
}

export default CartPage