import React from 'react';
import PropTypes from 'prop-types';
import Snippet from './Snippet';
import ClearSnippetsButton from './ClearSnippetsButton';

const SnippetsContainer = ({
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
        const container = document.getElementById('snippetsContainer');
        const containerScrollPosition = document.getElementById(
          'snippetsContainer'
        ).scrollLeft;
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + event.deltaY,
          behaviour: 'smooth'
        });
      }}
    >
      {snippets.map((snippet, index) => (
        <Snippet
          // snippets can have same value
          // eslint-disable-next-line
          key={`${snippet.value}-${index}`}
          flicker={snippet.flicker}
          isCopied={snippet.copied}
          index={index}
          isDark={isDark}
          value={snippet.value}
          isHashed={snippet.isHashed === true}
          isAt={snippet.isAt === true}
          handleSnippetCopy={handleSnippetCopy}
          handleRemoveSnippet={() => handleRemoveSnippet(index)}
        />
      ))}
    </div>{' '}
    <div>
      <ClearSnippetsButton handleClearSnippets={handleClearSnippets} />
    </div>
  </div>
);

SnippetsContainer.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string,
        copied: PropTypes.bool,
        flicker: PropTypes.bool,
        isHashed: PropTypes.bool,
        isAt: PropTypes.bool
      })
    ])
  ),
  isDark: PropTypes.bool,
  handleSnippetCopy: PropTypes.func,
  handleClearSnippets: PropTypes.func,
  handleRemoveSnippet: PropTypes.func
};

export default SnippetsContainer;
