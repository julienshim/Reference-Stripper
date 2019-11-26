import React from "react";

export default ({ className, label, handleCopy, isDark, copied }) => {
  const themeDark = {
    color: copied ? "" : "var(--ash)"
  };
  const theme = isDark ? themeDark : {};
  return (
    <div id="confirm" className={className} onClick={handleCopy} style={theme}>
      {label}
    </div>
  );
};
