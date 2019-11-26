import React from "react";

export default ({ value, isDark, handleChange, onSubmit }) => {
  return (
    <form id="snippetForm" onSubmit={onSubmit}>
      <input
        className={isDark ? "dark" : ""}
        type="text"
        id="snippetInput"
        value={value}
        placeholder="Enter new snippet"
        autoComplete="off"
        onChange={handleChange}
      ></input>
    </form>
  );
};
