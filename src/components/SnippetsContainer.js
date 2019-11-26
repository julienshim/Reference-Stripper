import React from 'react';
import Snippet from "./Snippet";

export default ({snippets, isDark, handleSnippetCopy, handleClearSnippets, handleRemoveSnippet}) => (

  <div className="snippet-container">
  <div
    id="snippetContainer"
    onWheel={event => {
      // event.preventDefault();
      const container = document.getElementById("snippetContainer");
      const containerScrollPosition = document.getElementById(
        "snippetContainer"
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
        handleSnippetCopy={() =>
          handleSnippetCopy(snippet.value, index)
        }
        handleRemoveSnippet={() => handleRemoveSnippet(index)}
      />
    ))}
  </div>{" "}
  <div>
    <svg
      onClick={handleClearSnippets}
      id="deleteSVG"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z" />
    </svg>
  </div>
</div>
)