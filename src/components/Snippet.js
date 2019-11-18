import React from "react";

export default ({ value, index, handleRemoveSnippet, isDark, flicker, isCopied, handleSnippetCopy }) => (
  <div className="snippet-container">
    <div className="snippet">
      <div
        id={`${value}-${index}`}
        className="snippet-label"
        style={
          isCopied && !flicker ? {background: "var(--peach)"} :
          isDark
            ? { background: "var(--ash)" }
            : { background: "var(--faded-ash)" }
        }
        data-value={value}
        onClick={handleSnippetCopy}
      >
        {value.length <= 30 ? value : `${value.slice(0, 30).trim()}...`}
      </div>
      <div className="delete-tag" onClick={handleRemoveSnippet}>
        {"x"}
      </div>
    </div>
  </div>
);
