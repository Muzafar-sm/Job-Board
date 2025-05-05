import { useState } from 'react';
import './Input.scss';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`input-field ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
      <div className="input-container">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          required={required}
        />
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <div className="input-border"></div>
        <div className="input-highlight"></div>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;