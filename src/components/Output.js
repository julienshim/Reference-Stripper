import React from 'react';
import PropTypes from 'prop-types';

const Output = ({
  flicker,
  copied,
  value,
  isDark,
  isLowerCase,
  strippedPlaceholder,
  handleCopy,
  outputTextareaRef,
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
      value={isLowerCase ? value.toLowerCase() : value}
      className={`split-view ${isDark ? 'dark' : ''} ${flickr}`}
      ref={outputTextareaRef}
      placeholder={
        isLowerCase ? strippedPlaceholder.toLowerCase() : strippedPlaceholder
      }
      onFocus={(event) => {
        if (event.keycode === undefined) {
          handleCopy();
        }
      }}
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
  isLowerCase: PropTypes.bool,
  strippedPlaceholder: PropTypes.string,
  handleCopy: PropTypes.func,
  outputTextareaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  ]),
};

export default Output;
