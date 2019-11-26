import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, isDark, placeholder, handleChange, changelogRef }) => (
  <textarea
    id="input"
    value={value}
    className={`split-view ${isDark ? 'dark' : ''}`}
    placeholder={placeholder}
    ref={changelogRef}
    onChange={handleChange}
  />
);

Input.propTypes = {
  value: PropTypes.string,
  isDark: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  changelogRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

export default Input;
