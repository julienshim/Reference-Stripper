import React from "react";

export default ({ children, isDark }) => {
  return (
    <div id="wrapper" className={isDark ? "dark" : ""}>
      {children}
    </div>
  );
};
