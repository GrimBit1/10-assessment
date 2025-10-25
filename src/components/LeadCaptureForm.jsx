import React from 'react';
import './LeadCaptureForm.css';

const LeadCaptureForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="lead-capture-overlay">
      <div className="lead-capture-modal">
        <button className="close-button" onClick={onBack}>×</button>
        
        <div className="logo">
          <span className="logo-10">10</span>
          <span className="logo-x">X</span>
          <span className="logo-coach">COACH.AI</span>
        </div>

        <h1 className="form-title">Get Your Business Report</h1>
        <p className="form-subtitle">Enter your details to receive your personalized business success scorecard.</p>

        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name *"
              value={formData.companyName}
              onChange={handleChange}
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Get My Results →
          </button>

          <button type="button" className="back-link" onClick={onBack}>
            Back to Questions
          </button>

          <p className="disclaimer">
            Your information is safe and will only be used to generate your personalized business report.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
