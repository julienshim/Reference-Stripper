import React from 'react';
import PropTypes from 'prop-types';

const SnippetForm = ({ value, isDark, handleChange, onSubmit }) => {
  return (
    <form id="snippetForm" onSubmit={onSubmit}>
      <input
        className={isDark ? 'dark' : ''}
        type="text"
        id="snippetInput"
        value={value}
        placeholder="Enter new snippet"
        autoComplete="off"
        onChange={handleChange}
      />
    </form>
  );
};

SnippetForm.propTypes = {
  value: PropTypes.string,
  isDark: PropTypes.bool,
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default SnippetForm;
