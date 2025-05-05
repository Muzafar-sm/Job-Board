import './Button.scss';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
    >
      {loading ? (
        <span className="btn__loader">
          <span className="btn__loader-dot"></span>
          <span className="btn__loader-dot"></span>
          <span className="btn__loader-dot"></span>
        </span>
      ) : (
        <span className="btn__content">{children}</span>
      )}
      <span className="btn__background"></span>
    </button>
  );
};

export default Button;