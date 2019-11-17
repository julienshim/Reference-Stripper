import React from "react";

export default ({ text, isDark }) => (
  <h1 id="title" className={isDark ? "dark" : ""}>{text}</h1>
);
