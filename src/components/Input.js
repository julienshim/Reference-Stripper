import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  value,
  isDark,
  placeholder,
  handleChange,
  changelogRef,
  isLowerCase
}) => {
  return (
    <textarea
      id="input"
      value={isLowerCase ? value.toLowerCase() : value}
      className={`split-view ${isDark ? 'dark' : ''}`}
      placeholder={isLowerCase ? placeholder.toLowerCase() : placeholder}
      ref={changelogRef}
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
  changelogRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

export default Input;
