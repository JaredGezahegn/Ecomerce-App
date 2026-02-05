import { Link } from "react-router-dom"
import { useLang } from "../../context/LangContext"
import { useState, useEffect } from "react"
import { FaLock } from "react-icons/fa"

const CartSummary = ({ cartTotal, tax }) => {
    const { t } = useLang();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(document.body.classList.contains('dark-theme'));
        };

        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const safeCartTotal = Number(cartTotal) || 0
    const safeTax = Number(tax) || 0

    const subTotal = safeCartTotal.toFixed(2)
    const cartTax = safeTax.toFixed(2)
    const total = (safeCartTotal + safeTax).toFixed(2)

    return (
        <div className="position-sticky" style={{ top: '100px' }}>
            <div className={`card shadow-sm border-0 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
                <div className="card-body p-4">
                    <h5 className="card-title mb-4 fw-bold">{t('cart.summary')}</h5>

                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">{t('cart.subtotal')}:</span>
                            <span className="fw-semibold">${subTotal}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">{t('cart.tax')}:</span>
                            <span className="fw-semibold">${cartTax}</span>
                        </div>

                        <hr className={isDarkMode ? 'border-secondary' : ''} />

                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold fs-5">{t('cart.total')}:</span>
                            <span className="fw-bold fs-5" style={{ color: '#6050DC' }}>${total}</span>
                        </div>
                    </div>

                    <Link to="/checkout" className="text-decoration-none">
                        <button
                            className="btn btn-primary w-100 py-3 fw-semibold"
                            style={{ 
                                backgroundColor: '#6050DC', 
                                borderColor: '#6050DC',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#5145C7';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(96, 80, 220, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#6050DC';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <FaLock className="me-2" />
                            {t('cart.checkout')}
                        </button>
                    </Link>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            <FaLock className="me-1" size={10} />
                            Secure checkout powered by Flutterwave
                        </small>
                    </div>
                </div>
            </div>

            {/* Additional Info Card */}
            <div className={`card shadow-sm border-0 mt-3 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
                <div className="card-body p-3">
                    <div className="d-flex align-items-start mb-2">
                        <span className="me-2">✓</span>
                        <small className="text-muted">Free shipping on orders over $50</small>
                    </div>
                    <div className="d-flex align-items-start mb-2">
                        <span className="me-2">✓</span>
                        <small className="text-muted">30-day return policy</small>
                    </div>
                    <div className="d-flex align-items-start">
                        <span className="me-2">✓</span>
                        <small className="text-muted">Secure payment processing</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSummary
