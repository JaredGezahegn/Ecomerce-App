import { useState } from 'react';
import { useLang } from '../context/LangContext';
import './Contact.css';
import { 
  FaCheckCircle, 
  FaPaperPlane, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';

const Contact = () => {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="contact-title">{t('contact.title')}</h1>
              <p className="contact-subtitle">{t('contact.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-wrapper">
                <h2 className="form-title">{t('contact.form.title')}</h2>
                <p className="form-description">{t('contact.form.description')}</p>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success" role="alert">
                    <FaCheckCircle className="me-2" />
                    {t('contact.form.success')}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder={t('contact.form.namePlaceholder')}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">{t('contact.form.email')}</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder={t('contact.form.emailPlaceholder')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">{t('contact.form.subject')}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder={t('contact.form.subjectPlaceholder')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">{t('contact.form.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="form-control"
                      placeholder={t('contact.form.messagePlaceholder')}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        {t('contact.form.send')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4">
              <div className="contact-info">
                <h3>{t('contact.info.title')}</h3>
                <p>{t('contact.info.description')}</p>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-details">
                    <h5>{t('contact.info.address.title')}</h5>
                    <p>{t('contact.info.address.value')}</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-details">
                    <h5>{t('contact.info.phone.title')}</h5>
                    <p>{t('contact.info.phone.value')}</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-details">
                    <h5>{t('contact.info.email.title')}</h5>
                    <p>{t('contact.info.email.value')}</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaClock />
                  </div>
                  <div className="contact-details">
                    <h5>{t('contact.info.hours.title')}</h5>
                    <p>{t('contact.info.hours.value')}</p>
                  </div>
                </div>
                
                <div className="social-links">
                  <h5>{t('contact.social.title')}</h5>
                  <div className="social-icons">
                    <a href="#" className="social-link">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="social-link">
                      <FaTwitter />
                    </a>
                    <a href="#" className="social-link">
                      <FaInstagram />
                    </a>
                    <a href="#" className="social-link">
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container-fluid p-0">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6177370450845!2d38.74689731478236!3d9.005401993527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;