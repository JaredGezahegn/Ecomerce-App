import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import api from '../api';
import './Profile.css';

const Profile = () => {
  const { user, fetchUserInfo, logout } = useAuth();
  const { t, language, toggleLanguage } = useLang();
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

  // State for addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      isDefault: true,
      fullName: '',
      address: '',
      city: '',
      state: '',
      phone: ''
    }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // State for security
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // State for settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    language: 'en'
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
    return `${parseFloat(price).toFixed(2)} ETB`;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  const getFullName = () => {
    return `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'User';
  };

  // Address handlers
  const handleAddAddress = () => {
    setEditingAddress({
      id: Date.now(),
      label: '',
      isDefault: false,
      fullName: getFullName(),
      address: '',
      city: '',
      state: '',
      phone: formData.phone || ''
    });
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress({...address});
    setShowAddressModal(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      const existingIndex = addresses.findIndex(a => a.id === editingAddress.id);
      if (existingIndex >= 0) {
        const updated = [...addresses];
        updated[existingIndex] = editingAddress;
        setAddresses(updated);
      } else {
        setAddresses([...addresses, editingAddress]);
      }
      setShowAddressModal(false);
      setEditingAddress(null);
      setMessage('Address saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(a => a.id !== id));
      setMessage('Address deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
  };

  // Security handlers
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    setLoading(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setMessage('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to change password. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setMessage(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}!`);
    setTimeout(() => setMessage(''), 3000);
  };

  // Settings handlers
  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    setMessage('Setting updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLanguageChange = (newLang) => {
    if (newLang !== language) {
      toggleLanguage();
      setSettings({...settings, language: newLang});
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone!')) {
      if (window.confirm('This will permanently delete all your data. Continue?')) {
        // API call would go here
        alert('Account deletion requested. You will be logged out.');
        logout();
      }
    }
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
        <button
          className={`nav-item ${activeSection === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveSection('addresses')}
        >
          <i className="fas fa-map-marker-alt"></i>
          <span>Addresses</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'security' ? 'active' : ''}`}
          onClick={() => setActiveSection('security')}
        >
          <i className="fas fa-lock"></i>
          <span>Security</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveSection('settings')}
        >
          <i className="fas fa-cog"></i>
          <span>Settings</span>
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

  const renderAddresses = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Saved Addresses</h2>
        <button className="btn btn-primary" onClick={handleAddAddress}>
          <i className="fas fa-plus"></i> Add New Address
        </button>
      </div>
      
      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      
      <div className="addresses-grid">
        {addresses.map((address) => (
          <div key={address.id} className="address-card">
            <div className="address-header">
              <h4>{address.label || 'Address'}</h4>
              {address.isDefault && <span className="default-badge">Default</span>}
            </div>
            <div className="address-body">
              <p><strong>{address.fullName || getFullName()}</strong></p>
              <p>{address.address || formData.address || 'No address provided'}</p>
              <p>{address.city && address.state ? `${address.city}, ${address.state}` : (formData.city && formData.state ? `${formData.city}, ${formData.state}` : '')}</p>
              <p>{address.phone || formData.phone || 'No phone number'}</p>
            </div>
            <div className="address-actions">
              <button className="btn-link" onClick={() => handleEditAddress(address)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              {!address.isDefault && (
                <>
                  <button className="btn-link" onClick={() => handleSetDefaultAddress(address.id)}>
                    <i className="fas fa-star"></i> Set Default
                  </button>
                  <button className="btn-link text-danger" onClick={() => handleDeleteAddress(address.id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        
        <div className="address-card add-new" onClick={handleAddAddress}>
          <i className="fas fa-plus-circle"></i>
          <p>Add New Address</p>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingAddress?.id && addresses.find(a => a.id === editingAddress.id) ? 'Edit Address' : 'Add New Address'}</h3>
              <button className="modal-close" onClick={() => setShowAddressModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Label</label>
                <input
                  type="text"
                  value={editingAddress?.label || ''}
                  onChange={(e) => setEditingAddress({...editingAddress, label: e.target.value})}
                  placeholder="e.g., Home, Office"
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editingAddress?.fullName || ''}
                  onChange={(e) => setEditingAddress({...editingAddress, fullName: e.target.value})}
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={editingAddress?.address || ''}
                  onChange={(e) => setEditingAddress({...editingAddress, address: e.target.value})}
                  placeholder="Street address"
                  rows="3"
                />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={editingAddress?.city || ''}
                    onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={editingAddress?.state || ''}
                    onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editingAddress?.phone || ''}
                  onChange={(e) => setEditingAddress({...editingAddress, phone: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddressModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSecurity = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Security Settings</h2>
      </div>
      
      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      
      <div className="security-options">
        <div className="security-card">
          <div className="security-icon">
            <i className="fas fa-key"></i>
          </div>
          <div className="security-info">
            <h4>Password</h4>
            <p>Keep your account secure with a strong password</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setShowPasswordModal(true)}>
            Change Password
          </button>
        </div>

        <div className="security-card">
          <div className="security-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="security-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
            <span className={`status-badge ${twoFactorEnabled ? 'status-enabled' : 'status-disabled'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <button className="btn btn-secondary" onClick={handleToggle2FA}>
            {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
          </button>
        </div>

        <div className="security-card">
          <div className="security-icon">
            <i className="fas fa-mobile-alt"></i>
          </div>
          <div className="security-info">
            <h4>Login Activity</h4>
            <p>View recent login activity and manage sessions</p>
            <small className="text-muted">Last login: {new Date().toLocaleDateString()}</small>
          </div>
          <button className="btn btn-secondary">
            View Activity
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    required
                    minLength="8"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="content-section">
      <div className="section-header">
        <h2>Account Settings</h2>
      </div>
      
      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
      
      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Email Notifications</h4>
            <p>Receive updates about your orders and promotions</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>SMS Notifications</h4>
            <p>Get text messages about order status</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Marketing Emails</h4>
            <p>Receive promotional offers and discounts</p>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.marketingEmails}
              onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Language</h4>
            <p>Choose your preferred language</p>
          </div>
          <select 
            className="form-select"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="am">አማርኛ (Amharic)</option>
          </select>
        </div>

        <div className="setting-item danger-zone">
          <div className="setting-info">
            <h4>Delete Account</h4>
            <p>Permanently delete your account and all data</p>
          </div>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
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
      case 'security':
        return renderSecurity();
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
