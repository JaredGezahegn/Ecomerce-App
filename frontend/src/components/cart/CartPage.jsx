import CartItem from "./CartItem"
import CartSummary from "./CartSummary"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../utils/api"
import { useLang } from "../../context/LangContext"
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa"

const CartPage = () => {
    const { t } = useLang();
    const cart_code = localStorage.getItem("cart_code")
    const [cartitems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0.00)
    const [loading, setLoading] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const tax = 4.00

    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(document.body.classList.contains('dark-theme'));
        };

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const fetchCart = () => {
        setLoading(true)
        api.get(`get_cart?cart_code=${cart_code}`)
            .then(res => {
                console.log(res.data)
                setCartItems(res.data.items)
                setCartTotal(res.data.sum_total || 0)
            })
            .catch(err => {
                console.log(err.message)
            })
            .finally(() => {
                setLoading(false)
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

    if (loading) {
        return (
            <div className="container my-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className={`mt-3 ${isDarkMode ? 'text-light' : 'text-dark'}`}>Loading your cart...</p>
                </div>
            </div>
        )
    }

    if (cartitems.length < 1) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className={`card shadow-sm border-0 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
                            <div className="card-body text-center p-5">
                                <FaShoppingCart size={80} className="text-muted mb-4" />
                                <h3 className="mb-3">{t('cart.empty')}</h3>
                                <p className="text-muted mb-4">{t('cart.emptyDesc')}</p>
                                <Link to="/" className="btn btn-primary" style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}>
                                    <FaArrowLeft className="me-2" />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className={`mb-1 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                        <FaShoppingCart className="me-2" />
                        {t('cart.title')}
                    </h2>
                    <p className="text-muted mb-0">{cartitems.length} {cartitems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>
                <Link to="/" className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                </Link>
            </div>

            {/* Cart Content */}
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className={`card shadow-sm border-0 ${isDarkMode ? 'bg-dark' : ''}`}>
                        <div className="card-body p-4">
                            {cartitems.map(item => 
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <CartSummary cartTotal={cartTotal} tax={tax} />
                </div>
            </div>
        </div>
    )
}

export default CartPage