import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData); // Pass the entire formData object instead of individual fields
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__header">
          <h1 className="auth__title">Create an account</h1>
          <p className="auth__subtitle">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
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
            <label htmlFor="name" className="auth__label">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="auth__input"
              placeholder="Enter your full name"
              value={name}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="auth__input-group">
            <label htmlFor="role" className="auth__label">
              I want to
            </label>
            <select
              id="role"
              name="role"
              className="auth__input"
              value={role}
              onChange={handleChange}
            >
              <option value="jobseeker">Find a job</option>
              <option value="recruiter">Post jobs</option>
            </select>
          </div>

          <button type="submit" className="auth__submit">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;