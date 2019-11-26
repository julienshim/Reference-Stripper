import React from 'react';
import PropTypes from 'prop-types';

const Snippet = ({
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
  const wikiRef = `https://en.wikipedia.org/wiki/${value.split(' ').join('_')}`;
  const hashCheckedValue =
    (isHashed || isAt) && value.includes('(')
      ? `the ${value
          .replace(/[(]/g, '#')
          .replace(/[)]/g, '')
          .split(/[#\s]{2,}/)
          .reverse()
          .join(' ')}`
      : value;

  const snippetStyle = { background: '' };
  if (isCopied && !flicker) {
    snippetStyle.background = 'var(--peach';
  } else {
    snippetStyle.background = isDark ? 'var(--ash)' : 'var(--faded-ash)';
  }

  return (
    <div className="snippet-container">
      <div className="snippet">
        <div
          id={`${value}-${index}`}
          className="snippet-label"
          style={snippetStyle}
          data-value={hashCheckedValue}
          onClick={handleSnippetCopy}
          onKeyUp={handleSnippetCopy}
          role="button"
          tabIndex={0}
        >
          {value.length <= 30 ? value : `${value.slice(0, 30).trim()}...`}
        </div>
        {isHashed && (
          <a
            href={wikiRef}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="wiki">W</div>
          </a>
        )}
        {(isHashed || isAt) && value.includes('(') && (
          <div className="strike-tag">
            <span style={{ color: 'var(--charcoal)' }} id="switch">
              ( )
            </span>
          </div>
        )}
        <div
          className="delete-tag"
          onClick={handleRemoveSnippet}
          onKeyUp={handleRemoveSnippet}
          role="button"
          tabIndex={0}
        >
          X
        </div>
      </div>
    </div>
  );
};

Snippet.propTypes = {
  value: PropTypes.string,
  index: PropTypes.number,
  handleRemoveSnippet: PropTypes.func,
  isDark: PropTypes.bool,
  flicker: PropTypes.bool,
  isCopied: PropTypes.bool,
  handleSnippetCopy: PropTypes.func,
  isHashed: PropTypes.bool,
  isAt: PropTypes.bool
};

export default Snippet;
