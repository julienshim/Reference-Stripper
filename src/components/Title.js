import React from "react";

export default ({ text, isDark }) => (
  <h1 className={isDark ? "dark" : ""}>{text}</h1>
);
