import { useLang } from "../../context/LangContext";
import { useState, useEffect } from 'react';

const CartItem = ({item, updateQuantity, removeItem}) => {
    const { t } = useLang();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

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
    
    return (
        <div className="col-md-12">
            {/* {cart Items} */}
            <div
                className="cart-item d-flex align-items-center mb-3 p-3"
                style={{ 
                    background: isDarkMode ? '#2a2a2a' : '#f8f9fa', 
                    borderRadius: '8px',
                    border: isDarkMode ? '1px solid #444' : '1px solid #e0e0e0'
                }} >
                <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                <div className="ms-3 flex-grow-1">
                    <h5 className={`mb-1 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                        {item.product.name}
                    </h5>
                    <p className={`mb-0 ${isDarkMode ? 'text-warning' : 'text-primary'} fw-bold`}>
                        ${item.product.price}
                    </p>
                    <p className={`mb-0 ${isDarkMode ? 'text-success' : 'text-success'}`}>
                        Total: ${item.total}
                    </p>
                </div>
                <div className="d-flex align-items-center">
                    <input
                        type="number"
                        className={`form-control me-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
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
                        {t('cart.remove')}
                    </button>
                </div>
            </div>
            {/* {add more cart items here} */}
        </div>
    )
}

export default CartItem