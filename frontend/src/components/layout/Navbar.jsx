import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          JobBoard
        </Link>

        <div className="navbar__nav">
          <Link
            to="/jobs"
            className={`navbar__link ${isActive('/jobs') ? 'navbar__link--active' : ''}`}
          >
            Jobs
          </Link>
        </div>

        <div className="navbar__auth">
          {user ? (
            <>
              {user.role === 'recruiter' && (
                <Link
                  to="/post-job"
                  className="navbar__button navbar__button--primary"
                >
                  Post a Job
                </Link>
              )}
              <Link
                to="/dashboard"
                className={`navbar__link ${isActive('/dashboard') ? 'navbar__link--active' : ''}`}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="navbar__button navbar__button--ghost"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`navbar__link ${isActive('/login') ? 'navbar__link--active' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="navbar__button navbar__button--primary"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;