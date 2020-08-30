import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  value,
  isDark,
  placeholder,
  handleChange,
  isLowerCase,
  specialCharactersFound,
}) => (
  <div
    style={{
      position: 'relative',
    }}
  >
    <textarea
      id="input"
      value={isLowerCase ? value.toLowerCase() : value}
      className={`split-view ${isDark ? 'dark' : ''}`}
      placeholder={isLowerCase ? placeholder.toLowerCase() : placeholder}
      onChange={handleChange}
    />
    {specialCharactersFound.length > 0 && (
      <div className="warning">
        {specialCharactersFound.map((char, index) => (
          <span key={char} style={{ margin: '4px', display: 'inline-flex' }}>
            {char}
          </span>
        ))}
      </div>
    )}
  </div>
);

Input.propTypes = {
  value: PropTypes.string,
  isDark: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  isLowerCase: PropTypes.bool,
  specialCharactersFound: PropTypes.arrayOf(PropTypes.string),
};

export default Input;
