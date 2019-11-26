import React from 'react';
import PropTypes from 'prop-types';

const Output = ({
  flicker,
  copied,
  value,
  isDark,
  handleStrip,
  handleCopy,
  outputTextareaRef
}) => {
  let flickr;
  if (flicker && copied) {
    flickr = 'flicker red';
  } else if (copied) {
    flickr = 'red';
  } else {
    flickr = '';
  }

  return (
    <textarea
      id="output"
      value={value}
      className={`split-view ${isDark ? 'dark' : ''} ${flickr}`}
      ref={outputTextareaRef}
      placeholder={handleStrip}
      onFocus={handleCopy}
      onMouseDown={handleCopy}
      readOnly
    />
  );
};

Output.propTypes = {
  flicker: PropTypes.bool,
  copied: PropTypes.bool,
  value: PropTypes.string,
  isDark: PropTypes.bool,
  handleStrip: PropTypes.string,
  handleCopy: PropTypes.func,
  outputTextareaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

export default Output;
