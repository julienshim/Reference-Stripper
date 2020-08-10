import React from 'react';
import PropTypes from 'prop-types';

const PresetsContainer = ({ presets, isDark, handleLoadPreset }) => {
  const buttonStyle = {
    border: isDark ? '1px solid var(--blue)' : '1px solid var(--faded-blue)',
    background: isDark ? 'var(--faded-clay' : 'var(--faded-ash)'
  };
  return (
    <div id="presetsContainer">
      <div
        id="preset-first"
        className="presets-button"
        style={buttonStyle}
        title={presets.first ? presets.first : 'No value saved to $preset1'}
        data-preset={presets.first}
        onClick={() => handleLoadPreset('first')}
        onKeyUp={() => handleLoadPreset('first')}
        role="button"
        tabIndex={0}
      >
        Preset 1
      </div>
      <div
        id="preset-second"
        className="presets-button"
        style={buttonStyle}
        title={presets.second ? presets.second : 'No value saved to $preset2'}
        data-preset={presets.second}
        onClick={() => handleLoadPreset('second')}
        onKeyUp={() => handleLoadPreset('second')}
        role="button"
        tabIndex={0}
      >
        Preset 2
      </div>
    </div>
  );
};

PresetsContainer.propTypes = {
  presets: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string
  }),
  isDark: PropTypes.bool,
  handleLoadPreset: PropTypes.func
};

export default PresetsContainer;
