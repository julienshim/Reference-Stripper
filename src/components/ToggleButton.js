import React from "react";

export default ({ isDark, handleOnClick, handleState, text, subline }) => (
  <div id="toggle">
    <label className="switch">
      <input checked={handleState} type="checkbox" onChange={handleOnClick} />
      <span className="slider"></span>
    </label>
    <p id="toggleLabel" className={isDark ? "dark" : ""}>
      {text} {subline && <span id="subline">{subline}</span>}
    </p>
  </div>
);
