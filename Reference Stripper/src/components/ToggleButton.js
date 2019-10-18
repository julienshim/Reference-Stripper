import React from 'react';

export default ({ isDark, handleToggleDarkMode, style }) => (
  <div id="toggle">
    <label className="switch">
      <input defaultChecked={isDark} type="checkbox" onClick={handleToggleDarkMode}/>
      <span className="slider"></span>
    </label>
    <p id="toggleLabel" style={style}>{"Dark Mode"}</p>
  </div>
);