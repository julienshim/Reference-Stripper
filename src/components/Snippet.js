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
  isHashed
}) => {
  const wikiVal = value.includes('?') ? value.replace('?', '%3F') : value;
  const wikiRef = `https://en.wikipedia.org/wiki/${wikiVal
    .split(' ')
    .join('_')}`;
  let hashCheckedValue;
  let hashCheckedValueSimple;

  if (isHashed && (value.includes('(') || value.includes(','))) {
    let tempHashCheckedValue;
    if (value.includes('(')) {
      tempHashCheckedValue = value.replace(/[(]/g, '#').replace(/[)]/g, '');
    }
    if (value.includes(',')) {
      tempHashCheckedValue = value.replace(/[,]/g, '#');
    }
    const [head, tail] = tempHashCheckedValue.split(/[#\s]{2,}/);
    hashCheckedValue = [tail, head].join(' ');
    hashCheckedValueSimple = head;
  } else {
    hashCheckedValue = value;
  }

  const snippetStyle = { background: '' };
  if (isCopied && !flicker) {
    snippetStyle.background = 'var(--peach';
  } else {
    snippetStyle.background = isDark ? 'var(--ash)' : 'var(--faded-ash)';
  }

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
    >
      <path d="M6 13v4l-6-5 6-5v4h3v2h-3zm9-2v2h3v4l6-5-6-5v4h-3zm-4-6v14h2v-14h-2z" />
    </svg>
  );

  return (
    <div className="snippet-container">
      <div className="snippet">
        <div
          id={`${value}-${index}-A`}
          className="snippet-label"
          style={snippetStyle}
          data-value={value}
          onClick={() => handleSnippetCopy(value, index, 'A')}
          onKeyUp={() => handleSnippetCopy(value, index, 'A')}
          role="button"
          tabIndex={0}
        >
          {value.length <= 30 ? value : `${value.slice(0, 30).trim()}...`}
        </div>
        {isHashed && (value.includes('(') || value.includes(',')) && (
          <div
            id={`${value}-${index}-B`}
            data-value={hashCheckedValue}
            onClick={() => handleSnippetCopy(value, index, 'B')}
            onKeyUp={() => handleSnippetCopy(value, index, 'B')}
            role="button"
            tabIndex={0}
            style={{ fill: isDark ? 'var(--ash)' : 'var(--charcoal)' }}
            className="reverse-tag"
          >
            {arrow}
          </div>
        )}
        {isHashed && (value.includes('(') || value.includes(',')) && (
          <div
            id={`${value}-${index}-C`}
            data-value={hashCheckedValueSimple}
            onClick={() => handleSnippetCopy(value, index, 'C')}
            onKeyUp={() => handleSnippetCopy(value, index, 'C')}
            role="button"
            tabIndex={0}
            className="strike-tag"
          >
            <span
              style={{ color: isDark ? 'var(--ash)' : 'var(--charcoal)' }}
              id="switch"
            >
              ( ) ,
            </span>
          </div>
        )}
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
  isHashed: PropTypes.bool
};

export default Snippet;
