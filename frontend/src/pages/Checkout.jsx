import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import api from '../api';

const Checkout = () => {
  const { t } = useLang();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState('');

  const cart_code = localStorage.getItem('cart_code');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Fetch cart data
    api.get(`get_cart?cart_code=${cart_code}`)
      .then(res => {
        setCartData(res.data);
      })
      .catch(err => {
        console.error('Error fetching cart:', err);
        setError('Failed to load cart data');
      });
  }, [isAuthenticated, navigate, cart_code]);

  const handlePayment = async () => {
    if (!cartData || cartData.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('initiate_payment/', {
        cart_code: cart_code,
        email: user.email,
        phone_number: user.phone_number || '',
        name: `${user.first_name} ${user.last_name}`.trim() || user.username
      });

      console.log('Payment response:', response.data);

      if (response.data.flutterwave && response.data.flutterwave.data && response.data.flutterwave.data.link) {
        // Redirect to Flutterwave payment page
        window.location.href = response.data.flutterwave.data.link;
      } else {
        console.error('Invalid response structure:', response.data);
        setError('Failed to initiate payment. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      console.error('Error response:', err.response?.data);
      
      // Show more detailed error message
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          err.message || 
                          'Payment initiation failed. Please check your connection and try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!cartData) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const tax = 4.00;
  const subtotal = Number(cartData.sum_total) || 0;
  const total = subtotal + tax;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title mb-4">Checkout</h3>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Order Summary */}
              <div className="mb-4">
                <h5 className="mb-3">Order Summary</h5>
                <div className="border rounded p-3">
                  {cartData.items.map(item => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>{(item.product.price * item.quantity).toFixed(2)} ETB</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>{subtotal.toFixed(2)} ETB</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>{tax.toFixed(2)} ETB</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>{total.toFixed(2)} ETB</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <h5 className="mb-3">Customer Information</h5>
                <div className="border rounded p-3">
                  <p className="mb-1"><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                  <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                  {user.phone_number && (
                    <p className="mb-0"><strong>Phone:</strong> {user.phone_number}</p>
                  )}
                </div>
              </div>

              {/* Payment Button */}
              <button
                className="btn btn-primary w-100 py-3"
                style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
                onClick={handlePayment}
                disabled={loading || cartData.items.length === 0}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  `Pay ${total.toFixed(2)} ETB`
                )}
              </button>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Secure payment powered by Flutterwave
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
