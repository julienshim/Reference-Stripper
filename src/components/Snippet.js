import React from "react";
import { inherits } from "util";

export default ({
  value,
  index,
  handleRemoveSnippet,
  isDark,
  flicker,
  isCopied,
  handleSnippetCopy,
  isHashed,
  isAt
}) => {
  const wikiRef = `https://en.wikipedia.org/wiki/${value.split(" ").join("_")}`
  const hashCheckedValue = (isHashed || isAt) ? `the ${value.replace(/[(]/g, "#").replace(/[)]/g, "").split(/[#\s]{2,}/).reverse().join(" ")}` : value ;
  return (
    <div className="snippet-container">
      <div className="snippet">
        <div
          id={`${value}-${index}`}
          className="snippet-label"
          style={
            isCopied && !flicker
              ? { background: "var(--peach)" }
              : isDark
              ? { background: "var(--ash)" }
              : { background: "var(--faded-ash)" }
          }
          data-value={hashCheckedValue}
          onClick={handleSnippetCopy}
        >
          {value.length <= 30 ? value : `${value.slice(0, 30).trim()}...`}
        </div>
        {isHashed && (
          <a href={wikiRef} style={{color: "inherit", textDecoration: "inherit"}} target="_blank">
            <div className="wiki">{"W"}</div>
          </a>
        )}
        <div className="delete-tag" onClick={handleRemoveSnippet}>
          {"X"}
        </div>
      </div>
    </div>
  );
};
