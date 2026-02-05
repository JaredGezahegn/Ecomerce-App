import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import api from '../api';
import './Profile.css';

const Profile = () => {
  const { user, fetchUserInfo, logout } = useAuth();
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState('account');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // State for orders
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
        state: user.state || '',
        address: user.address || '',
      });
    }
  }, [user]);

  // Load orders when section changes
  useEffect(() => {
    if (activeSection === 'orders' && user) {
      loadOrders();
    }
  }, [activeSection, user]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await api.get('user_orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.patch('user_info/', formData);
      await fetchUserInfo();
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  const getFullName = () => {
    return `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'User';
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="not-logged-in-card">
            <div className="not-logged-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <h2>Access Required</h2>
            <p>Please log in to view and manage your profile information.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderSidebar = () => (
    <div className="profile-sidebar">
      <div className="sidebar-user-info">
        <div className="user-avatar-container">
          <div className="user-avatar">
            {getInitials(user.first_name, user.last_name)}
          </div>
        </div>
        <h3 className="user-name">{getFullName()}</h3>
        <p className="user-email">{user.email}</p>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeSection === 'account' ? 'active' : ''}`}
          onClick={() => setActiveSection('account')}
        >
          <i className="fas fa-user"></i>
          <span>Account Info</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveSection('orders')}
        >
          <i className="fas fa-box"></i>
          <span>My Orders</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  const renderAccountInfo = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Personal Information</h2>
        {!isEditing ? (
          <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        ) : null}
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          <i className={`fas ${message.includes('success') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          {message}
        </div>
      )}

      <div className="account-content">
        <div className="avatar-section">
          <div className="profile-avatar-large">
            {getInitials(user.first_name, user.last_name)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Full Name</label>
              <div className="name-inputs">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={true}
              />
              <small className="form-text">Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your city"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your state"
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your full address"
              />
            </div>
          </div>

          {isEditing && (
            <div className="form-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    first_name: user.first_name || '',
                    last_name: user.last_name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    city: user.city || '',
                    state: user.state || '',
                    address: user.address || '',
                  });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>My Orders</h2>
        <span className="order-count">{orders.length} orders</span>
      </div>
      
      {loadingOrders ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-box-open"></i>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <a href="/" className="btn btn-primary">
            <i className="fas fa-shopping-bag"></i>
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h4>Order #{order.order_number}</h4>
                  <p className="order-date">{formatDate(order.date)}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge status-${order.status}`}>
                    <i className="fas fa-check-circle"></i>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.product_name} />
                      ) : (
                        <div className="placeholder-image">
                          <i className="fas fa-image"></i>
                        </div>
                      )}
                    </div>
                    <div className="item-details">
                      <h5>{item.product_name}</h5>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {formatPrice(item.total)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountInfo();
      case 'orders':
        return renderOrders();
      default:
        return renderAccountInfo();
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {renderSidebar()}
        <main className="profile-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
