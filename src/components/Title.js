import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text, isDark }) => (
  <h1 id="title" className={isDark ? 'dark' : ''}>
    {text}
  </h1>
);

Title.propTypes = {
  text: PropTypes.string,
  isDark: PropTypes.bool
};

export default Title;
