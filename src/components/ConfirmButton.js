import React from 'react';
import PropTypes from 'prop-types';

const ConfirmButton = ({ input, handleCopy, isDark, copied }) => {
  const themeDark = {
    color: copied ? '' : 'var(--ash)',
  };
  const theme = isDark ? themeDark : {};
  let label;
  if (copied) {
    label = input !== '' ? 'Copied' : 'Nothing to Copy!';
  } else {
    label = 'Copy';
  }
  return (
    <div
      id="confirm"
      className={copied ? 'red confirm' : 'confirm'}
      onClick={handleCopy}
      onKeyUp={handleCopy}
      style={theme}
      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  );
};

ConfirmButton.propTypes = {
  input: PropTypes.string,
  handleCopy: PropTypes.func,
  isDark: PropTypes.bool,
  copied: PropTypes.bool,
};

export default ConfirmButton;
