import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ handleOnClick, state, text }) => {
  return (
    <div id="toggle">
      <label className="switch" htmlFor={text}>
        <input
          id={text}
          checked={state}
          type="checkbox"
          onChange={handleOnClick}
        />
        <span className="slider" />
      </label>
      <p id="toggleLabel">{text}</p>
    </div>
  );
};

ToggleButton.propTypes = {
  handleOnClick: PropTypes.func,
  state: PropTypes.bool,
  text: PropTypes.string,
};

export default ToggleButton;
