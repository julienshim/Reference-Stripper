import React from "react";

export default ({ className, label, handleCopy, style }) => (
  <div id="confirm" className={className} onClick={handleCopy} style={style}>
    {label}
  </div>
);
