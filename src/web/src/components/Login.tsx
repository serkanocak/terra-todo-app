import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Shield } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      // credentialResponse.credential is the ID Token from Google
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`, {
        idToken: credentialResponse.credential
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess(token);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-page"></div>
      <div className="login-card">
        <div className="login-icon-wrapper">
          <Shield size={32} color="white" />
        </div>
        <h2>Welcome to Terra</h2>
        <p>Your secure personal task management hub. Please sign in to access your dashboard.</p>
        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed')}
            theme="filled_blue"
            shape="pill"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
