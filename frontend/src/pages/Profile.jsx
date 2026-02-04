import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './Profile.css';

const Profile = () => {
  const { user, fetchUserInfo, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('account');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    address: '',
    date_of_birth: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Additional state for other sections
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      address_line: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip_code: '10001',
      phone: '+1 (555) 123-4567',
      is_default: true
    }
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last_four: '4242',
      expiry_month: '12',
      expiry_year: '25',
      is_default: true
    }
  ]);
  const [wishlist, setWishlist] = useState([]);
  const [settings, setSettings] = useState({
    pushNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    newsletter: true,
    twoFactor: false,
    loginAlerts: true
  });
  const [loadingStates, setLoadingStates] = useState({
    orders: false,
    addresses: false,
    payment: false,
    wishlist: false
  });

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
        date_of_birth: user.date_of_birth || ''
      });
    }
  }, [user]);

  // Load data when section changes
  useEffect(() => {
    switch (activeSection) {
      case 'orders':
        loadOrders();
        break;
      case 'addresses':
        loadAddresses();
        break;
      case 'payment':
        loadPaymentMethods();
        break;
      case 'wishlist':
        loadWishlist();
        break;
      default:
        break;
    }
  }, [activeSection]);

  // Load functions for different sections
  const loadOrders = async () => {
    setLoadingStates(prev => ({ ...prev, orders: true }));
    try {
      // Since there's no orders endpoint in backend, we'll use mock data
      // In a real app, this would be: const response = await api.get('orders/');
      setTimeout(() => {
        setOrders([
          {
            id: 'ORD-2024-001',
            date: '2024-03-15',
            total: 299.99,
            status: 'delivered',
            items: [
              { name: 'iPhone 15 Pro', image: '📱', price: 199.99 },
              { name: 'Cotton T-Shirt', image: '👕', price: 29.99 }
            ]
          },
          {
            id: 'ORD-2024-002',
            date: '2024-03-20',
            total: 89.99,
            status: 'transit',
            items: [
              { name: 'Running Shoes', image: '👟', price: 89.99 }
            ]
          }
        ]);
        setLoadingStates(prev => ({ ...prev, orders: false }));
      }, 1000);
    } catch (error) {
      console.error('Error loading orders:', error);
      setLoadingStates(prev => ({ ...prev, orders: false }));
    }
  };

  const loadAddresses = async () => {
    setLoadingStates(prev => ({ ...prev, addresses: true }));
    try {
      // Mock implementation - in real app would fetch from backend
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, addresses: false }));
      }, 500);
    } catch (error) {
      console.error('Error loading addresses:', error);
      setLoadingStates(prev => ({ ...prev, addresses: false }));
    }
  };

  const loadPaymentMethods = async () => {
    setLoadingStates(prev => ({ ...prev, payment: true }));
    try {
      // Mock implementation - in real app would fetch from backend
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, payment: false }));
      }, 500);
    } catch (error) {
      console.error('Error loading payment methods:', error);
      setLoadingStates(prev => ({ ...prev, payment: false }));
    }
  };

  const loadWishlist = async () => {
    setLoadingStates(prev => ({ ...prev, wishlist: true }));
    try {
      // Since there's no wishlist endpoint, we'll use products as mock wishlist
      const response = await api.get('products/');
      const mockWishlist = response.data.slice(0, 3).map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.price * 1.2,
        image: product.thumbnail,
        in_stock: true
      }));
      setWishlist(mockWishlist);
      setLoadingStates(prev => ({ ...prev, wishlist: false }));
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setLoadingStates(prev => ({ ...prev, wishlist: false }));
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

  // Utility functions
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'fas fa-check-circle';
      case 'transit':
        return 'fas fa-truck';
      case 'processing':
        return 'fas fa-clock';
      case 'cancelled':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-box';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'transit':
        return 'status-transit';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  // Handler functions
  const handleRemoveFromWishlist = async (productId) => {
    try {
      setWishlist(prev => prev.filter(item => item.id !== productId));
      // In real app: await api.delete(`wishlist/${productId}/`);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      // Get cart code from localStorage or generate new one
      let cartCode = localStorage.getItem('cart_code');
      if (!cartCode) {
        cartCode = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('cart_code', cartCode);
      }

      await api.post('add_item/', {
        cart_code: cartCode,
        product_id: product.id,
        quantity: 1
      });

      setMessage('Item added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Failed to add item to cart.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    // In real app: await api.delete(`addresses/${addressId}/`);
  };

  const handleDeletePaymentMethod = (paymentId) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentId));
    // In real app: await api.delete(`payment-methods/${paymentId}/`);
  };

  const handleSettingToggle = (settingKey) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
    // In real app: await api.patch('settings/', { [settingKey]: !settings[settingKey] });
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
            <button className="btn btn-primary">
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderSidebar = () => (
    <div className="profile-sidebar">
      {/* User Info Section */}
      <div className="sidebar-user-info">
        <div className="user-avatar-container">
          <div className="user-avatar">
            {getInitials(user.first_name, user.last_name)}
          </div>
          <div className="avatar-edit-overlay">
            <i className="fas fa-camera"></i>
          </div>
        </div>
        <h3 className="user-name">{getFullName()}</h3>
        <p className="user-email">{user.email}</p>
      </div>

      {/* Navigation Menu */}
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
        <button
          className={`nav-item ${activeSection === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveSection('addresses')}
        >
          <i className="fas fa-map-marker-alt"></i>
          <span>Addresses</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveSection('payment')}
        >
          <i className="fas fa-credit-card"></i>
          <span>Payment Methods</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'wishlist' ? 'active' : ''}`}
          onClick={() => setActiveSection('wishlist')}
        >
          <i className="fas fa-heart"></i>
          <span>Wishlist</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveSection('settings')}
        >
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </nav>

      {/* Logout Button */}
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
            Edit Profile
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
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="profile-avatar-large">
            {getInitials(user.first_name, user.last_name)}
          </div>
          <div className="avatar-edit-large">
            <i className="fas fa-camera"></i>
          </div>
        </div>

        {/* Form Section */}
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
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={!isEditing}
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
              />
            </div>
          </div>

          {isEditing && (
            <div className="form-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
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
        <h2>Recent Orders</h2>
        <button className="btn btn-link">View All</button>
      </div>
      
      {loadingStates.orders ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-box-open"></i>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button className="btn btn-primary">Start Shopping</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-left">
                <div className="order-id">#{order.id}</div>
                <div className="order-date">{formatDate(order.date)}</div>
              </div>
              <div className="order-center">
                <div className="product-thumbnails">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="product-thumb">{item.image}</div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="product-count">+{order.items.length - 2}</div>
                  )}
                </div>
              </div>
              <div className="order-right">
                <div className="order-total">{formatPrice(order.total)}</div>
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  <i className={getStatusIcon(order.status)}></i>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <button className="btn btn-link">View</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Delivery Addresses</h2>
        <button className="btn btn-primary">Add New</button>
      </div>
      
      {loadingStates.addresses ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading addresses...</span>
        </div>
      ) : (
        <div className="addresses-grid">
          {addresses.map((address) => (
            <div key={address.id} className="address-card">
              <div className="address-header">
                <span className="address-label">{address.label}</span>
                {address.is_default && <span className="default-badge">Default</span>}
              </div>
              <div className="address-content">
                <div className="address-line">{address.address_line}</div>
                <div className="address-line">{address.city}, {address.state} {address.zip_code}</div>
                <div className="address-phone">{address.phone}</div>
              </div>
              <div className="address-actions">
                <button className="action-btn"><i className="fas fa-edit"></i></button>
                <button 
                  className="action-btn"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          <div className="address-card add-new">
            <div className="add-content">
              <i className="fas fa-plus"></i>
              <span>Add Address</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Payment Methods</h2>
        <button className="btn btn-primary">Add Card</button>
      </div>
      
      {loadingStates.payment ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading payment methods...</span>
        </div>
      ) : paymentMethods.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-credit-card"></i>
          <h3>No Payment Methods</h3>
          <p>Add a payment method to make checkout faster and easier.</p>
          <button className="btn btn-primary">Add Payment Method</button>
        </div>
      ) : (
        <div className="payment-list">
          {paymentMethods.map((payment) => (
            <div key={payment.id} className="payment-item">
              <div className="payment-left">
                <i className={`fab fa-cc-${payment.type} card-icon`}></i>
                <div className="card-info">
                  <div className="card-number">•••• •••• •••• {payment.last_four}</div>
                  <div className="card-expiry">Expires {payment.expiry_month}/{payment.expiry_year}</div>
                </div>
              </div>
              <div className="payment-right">
                {payment.is_default && (
                  <span className="default-indicator">
                    <i className="fas fa-check"></i>
                    Default
                  </span>
                )}
                <button 
                  className="btn btn-link"
                  onClick={() => handleDeletePaymentMethod(payment.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>My Wishlist</h2>
        <span className="item-count">{wishlist.length} items</span>
      </div>
      
      {loadingStates.wishlist ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading wishlist...</span>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-heart"></i>
          <h3>Your Wishlist is Empty</h3>
          <p>Save items you love to your wishlist and never lose track of them.</p>
          <button className="btn btn-primary">Start Shopping</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <button 
                className="remove-btn"
                onClick={() => handleRemoveFromWishlist(item.id)}
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="product-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="placeholder-image">📱</div>
                )}
              </div>
              <div className="product-info">
                <h4 className="product-name">{item.name}</h4>
                <div className="price-row">
                  <span className="current-price">{formatPrice(item.price)}</span>
                  {item.original_price > item.price && (
                    <span className="original-price">{formatPrice(item.original_price)}</span>
                  )}
                </div>
                <div className="stock-status">
                  {item.in_stock ? 'In Stock' : 'Out of Stock'}
                </div>
                <button 
                  className="btn btn-primary add-to-cart"
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.in_stock}
                >
                  {item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Account Settings</h2>
      </div>
      <div className="settings-content">
        <div className="settings-group">
          <h3 className="group-title">Notifications</h3>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Push Notifications</div>
              <div className="setting-description">Receive alerts for orders and promotions</div>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="push-notifications" 
                checked={settings.pushNotifications}
                onChange={() => handleSettingToggle('pushNotifications')}
              />
              <label htmlFor="push-notifications"></label>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Order Updates</div>
              <div className="setting-description">Get notified about shipping and delivery</div>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="order-updates" 
                checked={settings.orderUpdates}
                onChange={() => handleSettingToggle('orderUpdates')}
              />
              <label htmlFor="order-updates"></label>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3 className="group-title">Email Preferences</h3>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Promotional Emails</div>
              <div className="setting-description">Receive deals and new arrivals</div>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="promotional-emails" 
                checked={settings.promotionalEmails}
                onChange={() => handleSettingToggle('promotionalEmails')}
              />
              <label htmlFor="promotional-emails"></label>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Newsletter</div>
              <div className="setting-description">Weekly curated product recommendations</div>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="newsletter" 
                checked={settings.newsletter}
                onChange={() => handleSettingToggle('newsletter')}
              />
              <label htmlFor="newsletter"></label>
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3 className="group-title">Privacy & Security</h3>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Two-Factor Authentication</div>
              <div className="setting-description">Add extra security to your account</div>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="two-factor" 
                checked={settings.twoFactor}
                onChange={() => handleSettingToggle('twoFactor')}
              />
              <label htmlFor="two-factor"></label>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Login Alerts</div>
              <div className="setting-description">Get notified of new sign-ins</div>
            </div>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                id="login-alerts" 
                checked={settings.loginAlerts}
                onChange={() => handleSettingToggle('loginAlerts')}
              />
              <label htmlFor="login-alerts"></label>
            </div>
          </div>
        </div>

        <div className="danger-zone">
          <button className="btn btn-danger-outline">Delete Account</button>
          <p className="danger-warning">This action cannot be undone. All your data will be permanently deleted.</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountInfo();
      case 'orders':
        return renderOrders();
      case 'addresses':
        return renderAddresses();
      case 'payment':
        return renderPaymentMethods();
      case 'wishlist':
        return renderWishlist();
      case 'settings':
        return renderSettings();
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