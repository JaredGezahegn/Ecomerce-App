import { useState } from 'react';
import { useLang } from '../../context/LangContext';

function SignupForm({ onSuccess, onSwitchToLogin }) {
  console.log('SignupForm component is rendering');
  
  try {
    const { t } = useLang();
    const [loading, setLoading] = useState(false);

    console.log('SignupForm hooks initialized successfully');
    console.log('t function:', t);
    console.log('onSwitchToLogin function:', onSwitchToLogin);

    return (
      <div className="card shadow-lg">
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">Sign Up</h3>
          <p>Signup form is loading successfully!</p>
          <p>Language function working: {t ? 'Yes' : 'No'}</p>
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => {
              console.log('Switch to login clicked');
              onSwitchToLogin && onSwitchToLogin();
            }}
          >
            Login Instead
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in SignupForm component:', error);
    return (
      <div className="alert alert-danger">
        <h4>SignupForm Error</h4>
        <p>Error: {error.message}</p>
        <p>Stack: {error.stack}</p>
      </div>
    );
  }
}

export default SignupForm;