import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Welcome back</h1>
          <p className="auth__subtitle">
            Don't have an account?{' '}
            <Link to="/register">Create one now</Link>
          </p>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth__error">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
              </svg>
              {error}
            </div>
          )}

          <div className="auth__input-group">
            <label htmlFor="email" className="auth__label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="auth__input"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="auth__input-group">
            <label htmlFor="password" className="auth__label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="auth__input"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth__submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;