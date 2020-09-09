import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children, isDark }) => {
  return (
    <div id="wrapper" className={isDark ? 'dark' : ''}>
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  isDark: PropTypes.bool,
};

export default Wrapper;
