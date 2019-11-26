import React from "react";
import Snippet from "./Snippet";
import ClearSnippetsButton from "./ClearSnippetsButton";

export default ({
  snippets,
  isDark,
  handleSnippetCopy,
  handleClearSnippets,
  handleRemoveSnippet
}) => (
  <div className="snippets-container">
    <div
      id="snippetsContainer"
      onWheel={event => {
        // event.preventDefault();
        const container = document.getElementById("snippetsContainer");
        const containerScrollPosition = document.getElementById(
          "snippetsContainer"
        ).scrollLeft;
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + event.deltaY,
          behaviour: "smooth"
        });
      }}
    >
      {snippets.map((snippet, index) => (
        <Snippet
          key={`${snippet.value}-${index}`}
          flicker={snippet.flicker}
          isCopied={snippet.copied}
          index={index}
          isDark={isDark}
          value={snippet.value}
          isHashed={snippet.isHashed === true}
          isAt={snippet.isAt === true}
          handleSnippetCopy={() => handleSnippetCopy(snippet.value, index)}
          handleRemoveSnippet={() => handleRemoveSnippet(index)}
        />
      ))}
    </div>{" "}
    <div>
      <ClearSnippetsButton handleClearSnippets={handleClearSnippets} />
    </div>
  </div>
);
