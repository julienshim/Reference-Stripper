import React from 'react';
import PropTypes from 'prop-types';
import Snippet from './Snippet';
import ClearSnippetsButton from './ClearSnippetsButton';
import PresetsContainer from './PresetsContainer';

const BarContainer = ({
  snippets,
  isDark,
  handleSnippetCopy,
  handleClearSnippets,
  handleRemoveSnippet,
  handleLoadPreset,
  onDragStart,
  onDragEnd,
  onDragOver,
  presets,
}) => {
  const style = { color: isDark ? 'var(--faded-ash)' : 'var(--ash)' };
  return (
    <div className="snippets-container">
      <PresetsContainer
        presets={presets}
        isDark={isDark}
        handleLoadPreset={handleLoadPreset}
      />
      <div
        id="snippetsContainer"
        onWheel={(event) => {
          // event.preventDefault();
          const container = document.getElementById('snippetsContainer');
          const containerScrollPosition = document.getElementById(
            'snippetsContainer'
          ).scrollLeft;
          container.scrollTo({
            top: 0,
            left: containerScrollPosition + event.deltaY,
            behaviour: 'smooth',
          });
        }}
      >
        {snippets.length === 0 ? (
          <span style={style}>No snippets</span>
        ) : (
          snippets.map((snippet, index) => (
            <Snippet
              // snippets can have same value
              // eslint-disable-next-line
          key={`${snippet.value}-${index}`}
              flicker={snippet.flicker}
              isCopied={snippet.copied}
              index={index}
              isDark={isDark}
              value={snippet.value}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              isHashed={snippet.isHashed === true}
              isAt={snippet.isAt === true}
              handleSnippetCopy={handleSnippetCopy}
              handleRemoveSnippet={() => handleRemoveSnippet(index)}
            />
          ))
        )}
      </div>{' '}
      <div>
        <ClearSnippetsButton
          handleClearSnippets={handleClearSnippets}
          totalSnippets={snippets.length}
        />
      </div>
    </div>
  );
};

BarContainer.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string,
        copied: PropTypes.bool,
        flicker: PropTypes.bool,
        isHashed: PropTypes.bool,
        isAt: PropTypes.bool,
      }),
    ])
  ),
  presets: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
  }),
  isDark: PropTypes.bool,
  handleSnippetCopy: PropTypes.func,
  handleClearSnippets: PropTypes.func,
  handleRemoveSnippet: PropTypes.func,
  handleLoadPreset: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default BarContainer;
