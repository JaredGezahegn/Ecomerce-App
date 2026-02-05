import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Payments = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const paymentStatus = searchParams.get('status');
    const txRef = searchParams.get('tx_ref');
    const transactionId = searchParams.get('transaction_id');

    if (!txRef || !transactionId) {
      setStatus('error');
      setMessage('Invalid payment response. Missing transaction details.');
      return;
    }

    // Call backend to verify payment
    const verifyPayment = async () => {
      try {
        const response = await api.post('payment_callback/', {
          status: paymentStatus,
          tx_ref: txRef,
          transaction_id: transactionId
        });

        if (response.data.message === 'Payment verified and cart marked as paid') {
          setStatus('success');
          setMessage('Payment successful! Your order has been confirmed.');
          
          // Clear cart code from localStorage
          localStorage.removeItem('cart_code');
          
          // Redirect to profile/orders after 3 seconds
          setTimeout(() => {
            navigate('/profile');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Payment verification failed. Please contact support.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
        setMessage(error.response?.data?.error || 'Payment verification failed. Please contact support.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate, isAuthenticated]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body text-center p-5">
              {status === 'processing' && (
                <>
                  <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h4 className="mb-3">Processing Payment</h4>
                  <p className="text-muted">{message}</p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#28a745" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                  </div>
                  <h4 className="text-success mb-3">Payment Successful!</h4>
                  <p className="text-muted">{message}</p>
                  <p className="text-muted">Redirecting to your orders...</p>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#dc3545" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                  </div>
                  <h4 className="text-danger mb-3">Payment Failed</h4>
                  <p className="text-muted">{message}</p>
                  <button 
                    className="btn btn-primary mt-3"
                    style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
                    onClick={() => navigate('/cart')}
                  >
                    Return to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
