import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text, isDark, handleCasing, isLowerCase }) => (
  <div
    onClick={handleCasing}
    onKeyUp={handleCasing}
    role="button"
    tabIndex={0}
    style={{ outline: 'none' }}
  >
    <h1 id="title" className={isDark ? 'dark' : ''}>
      {isLowerCase ? text.toLowerCase() : text}
    </h1>
  </div>
);

Title.propTypes = {
  text: PropTypes.string,
  isDark: PropTypes.bool,
  isLowerCase: PropTypes.bool,
  handleCasing: PropTypes.func
};

export default Title;
