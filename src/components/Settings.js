import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from './ToggleButton';

const Settings = ({
  handleWordCountLimit,
  handleSpecialCharacters,
  handleToggleDarkMode,
  handleToggleIncludeParentheses,
  includeParentheses,
  wordCountLimit,
  isDark,
  specialCharactersUser,
}) => (
  <ul>
    <li>
      <h1>Settings</h1>
    </li>
    <li>
      <ToggleButton
        state={isDark}
        handleOnClick={handleToggleDarkMode}
        text="Enable Dark Mode"
        isDark={isDark}
      />
    </li>
    <li>
      <ToggleButton
        state={includeParentheses}
        handleOnClick={handleToggleIncludeParentheses}
        text="Remove all parentheses and containing text"
      />
    </li>
    <li style={{ margin: '24px' }}>
      <p style={{ margin: '6px 0' }}>Set word count limit (0 - 99999)</p>
      <p style={{ margin: '6px 0' }}>
        (Set the word count to 0 for a traditional word count with no limits)
      </p>
      <input
        type="text"
        onChange={(event) => handleWordCountLimit(event.target.value)}
        value={wordCountLimit}
        autoComplete="off"
        style={{
          paddingLeft: '6px',
          width: '60px',
          border: 'none',
          color: '#ccc',
          backgroundColor: 'var(--blue)',
        }}
      />
    </li>
    <li style={{ margin: '24px' }}>
      <p style={{ margin: '6px 0' }}>
        Define special characters, words, acronyms to warn against
      </p>
      <p style={{ margin: '6px 0' }}>(Separate with a space, e.g. GBP ½ / ¾)</p>
      <input
        type="text"
        onChange={(event) => handleSpecialCharacters(event.target.value)}
        value={specialCharactersUser}
        autoComplete="off"
        style={{
          display: 'block',
          paddingLeft: '6px',
          width: '360px',
          border: 'none',
          color: '#ccc',
          backgroundColor: 'var(--blue)',
        }}
      />
    </li>
  </ul>
);

Settings.propTypes = {
  handleSpecialCharacters: PropTypes.func,
  isDark: PropTypes.bool,
  includeParentheses: PropTypes.bool,
  handleWordCountLimit: PropTypes.func,
  handleToggleIncludeParentheses: PropTypes.func,
  handleToggleDarkMode: PropTypes.func,
  wordCountLimit: PropTypes.number,
  specialCharactersUser: PropTypes.string,
};

export default Settings;
