import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, isDark, placeholder, handleChange, isLowerCase }) => {
  return (
    <textarea
      id="input"
      value={isLowerCase ? value.toLowerCase() : value}
      className={`split-view ${isDark ? 'dark' : ''}`}
      placeholder={isLowerCase ? placeholder.toLowerCase() : placeholder}
      onChange={handleChange}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  isDark: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  isLowerCase: PropTypes.bool,
};

export default Input;
