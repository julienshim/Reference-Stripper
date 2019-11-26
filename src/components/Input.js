import React from "react";

export default ({ value, isDark, placeholder, handleChange, changelogRef }) => (
  <textarea
    id="input"
    value={value}
    className={`split-view ${isDark ? "dark" : ""}`}
    placeholder={placeholder}
    ref={changelogRef}
    onChange={handleChange}
  />
);
