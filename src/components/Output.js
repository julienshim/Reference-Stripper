import React from "react";

export default ({
  flicker,
  copied,
  value,
  isDark,
  handleStrip,
  handleCopy,
  outputTextareaRef
}) => {
  const flickr = flicker && copied ? "flicker red" : copied ? "red" : "";
  return (
    <textarea
      id="output"
      value={value}
      className={`split-view ${isDark ? "dark" : ""} ${flickr}`}
      ref={outputTextareaRef}
      placeholder={handleStrip}
      onFocus={handleCopy}
      onMouseDown={handleCopy}
      readOnly
    />
  );
};
