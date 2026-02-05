import { useLang } from "../../context/LangContext";
import { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartItem = ({item, updateQuantity, removeItem}) => {
    const { t } = useLang();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const [quantity, setQuantity] = useState(item.quantity);

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

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(item.id, newQuantity);
        }
    };

    const handleInputChange = (e) => {
        const value = Math.max(1, Number(e.target.value) || 1);
        setQuantity(value);
        updateQuantity(item.id, value);
    };
    
    return (
        <div className={`d-flex align-items-center p-3 mb-3 rounded ${isDarkMode ? 'bg-secondary bg-opacity-10' : 'bg-light'}`}
             style={{ 
                 border: isDarkMode ? '1px solid #444' : '1px solid #e0e0e0',
                 transition: 'all 0.3s ease'
             }}>
            {/* Product Image */}
            <div className="flex-shrink-0">
                <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="rounded"
                    style={{ 
                        width: '100px', 
                        height: '100px', 
                        objectFit: 'cover',
                        border: isDarkMode ? '2px solid #444' : '2px solid #e0e0e0'
                    }} 
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow-1 ms-4">
                <h5 className={`mb-2 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                    {item.product.name}
                </h5>
                <p className="mb-1" style={{ color: '#6050DC', fontWeight: '600', fontSize: '1.1rem' }}>
                    ${item.product.price}
                </p>
                <p className={`mb-0 small ${isDarkMode ? 'text-light' : 'text-muted'}`}>
                    Subtotal: <span className="fw-bold" style={{ color: '#6050DC' }}>${item.total}</span>
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center me-3">
                <button 
                    className={`btn btn-sm ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    style={{ width: '35px', height: '35px', padding: '0' }}
                >
                    <FaMinus size={12} />
                </button>
                <input
                    type="number"
                    className={`form-control form-control-sm mx-2 text-center ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={quantity}
                    min="1"
                    onChange={handleInputChange}
                    style={{ width: '60px' }}
                />
                <button 
                    className={`btn btn-sm ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                    onClick={handleIncrement}
                    style={{ width: '35px', height: '35px', padding: '0' }}
                >
                    <FaPlus size={12} />
                </button>
            </div>

            {/* Remove Button */}
            <button 
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item.id)}
                title={t('cart.remove')}
                style={{ width: '40px', height: '40px', padding: '0' }}
            >
                <FaTrash size={14} />
            </button>
        </div>
    )
}

export default CartItem