// Reference Stripper

// Created by Julien Shim on 9/11/19.
// Copyright © 2019 Julien Shim. All rights reserved.

const Changelog = ({
  handleChangelogView,
  isViewingChangelog,
  changelogRef,
  updates
}) => {
  return (
    <div
      id="changelog"
      className={isViewingChangelog ? '' : 'hidden'}
      onClick={handleChangelogView}
      onKeyUp={handleChangelogView}
      ref={changelogRef}
      role="button"
      tabIndex={0}
    >
      <ChangelogItemList updates={updates} />
    </div>
  );
};

Changelog.propTypes = {
  handleChangelogView: PropTypes.func,
  isViewingChangelog: PropTypes.bool,
  changelogRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ]),
  updates: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        version: PropTypes.string,
        date: PropTypes.string,
        change: PropTypes.string
      })
    ])
  )
};

const ChangelogButton = ({ isDark, handleChangelogView, currentVersion }) => {
  const svgStyle = { fill: 'rgba(204, 204, 204, 0.8)' };
  const note = (
    <svg
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z" />
    </svg>
  );
  const noteDark = (
    <svg
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z" />
    </svg>
  );
  return (
    <div
      id="changelogButton"
      onClick={handleChangelogView}
      onKeyUp={handleChangelogView}
      role="button"
      tabIndex={0}
    >
      <span>{currentVersion}</span> {isDark ? noteDark : note}
    </div>
  );
};

ChangelogButton.propTypes = {
  isDark: PropTypes.bool,
  handleChangelogView: PropTypes.func,
  currentVersion: PropTypes.string
};

const ChangelogItem = ({ version, date, change }) => (
  <li className="changelog-li">
    <h2>
      <span>{`v${version}`}</span>
      {date}
    </h2>
    <p>{change}</p>
  </li>
);

ChangelogItem.propTypes = {
  version: PropTypes.string,
  date: PropTypes.string,
  change: PropTypes.string
};

const ChangelogItemList = ({ updates }) => (
  <div>
    <ul>
      <li>
        <h1>Changelog</h1>
      </li>
      {updates.map(update => {
        return (
          <ChangelogItem
            key={update.version}
            version={update.version}
            date={update.date}
            change={update.change}
          />
        );
      })}
    </ul>
  </div>
);

ChangelogItemList.propTypes = {
  updates: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        version: PropTypes.string,
        date: PropTypes.string,
        change: PropTypes.string
      })
    ])
  )
};

const CircularProgressBar = ({ wordCount, size }) => {
  const percentage = (wordCount / 30) * 100;
  const radius = size;
  const strokeWidth = radius / 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let backgroundStroke;
  let progressStroke;

  if (wordCount < 20) {
    backgroundStroke = 'var(--ash)';
    progressStroke = 'var(--blue)';
  } else if (wordCount < 30) {
    backgroundStroke = 'var(--ash)';
    progressStroke = 'var(--tangerine)';
  } else if (wordCount < 40) {
    backgroundStroke = 'var(--peach)';
    progressStroke = 'var(--peach)';
  } else {
    backgroundStroke = 'transparent';
    progressStroke = 'transparent';
  }

  const backgroundStyle = {
    strokeDashoffset,
    stroke: backgroundStroke
  };

  const progressStyle = {
    strokeDashoffset,
    stroke: progressStroke
  };

  const textStyle = { fill: wordCount < 30 ? 'var(--ash)' : 'var(--peach)' };

  return (
    <div id="circular-progress-bar">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          className="circle-background"
          strokeWidth={strokeWidth + 1}
          style={backgroundStyle}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="circle-progress"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={progressStyle}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3rem"
          textAnchor="middle"
          style={textStyle}
        >
          {30 - wordCount}
        </text>
      </svg>
    </div>
  );
};

CircularProgressBar.propTypes = {
  wordCount: PropTypes.number,
  size: PropTypes.number
};

const ClearSnippetsButton = ({ handleClearSnippets }) => (
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
);

ClearSnippetsButton.propTypes = {
  handleClearSnippets: PropTypes.func
};

const ConfirmButton = ({ input, handleCopy, isDark, copied }) => {
  const themeDark = {
    color: copied ? '' : 'var(--ash)'
  };
  const theme = isDark ? themeDark : {};
  let label;
  if (copied) {
    label = input !== '' ? 'Copied' : 'Nothing to Copy!';
  } else {
    label = 'Copy';
  }
  return (
    <div
      id="confirm"
      className={copied ? 'red confirm' : 'confirm'}
      onClick={handleCopy}
      onKeyUp={handleCopy}
      style={theme}
      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  );
};

ConfirmButton.propTypes = {
  input: PropTypes.string,
  handleCopy: PropTypes.func,
  isDark: PropTypes.bool,
  copied: PropTypes.bool
};

const Input = ({
  value,
  isDark,
  placeholder,
  handleChange,
  changelogRef,
  isLowerCase
}) => {
  return (
    <textarea
      id="input"
      value={isLowerCase ? value.toLowerCase() : value}
      className={`split-view ${isDark ? 'dark' : ''}`}
      placeholder={isLowerCase ? placeholder.toLowerCase() : placeholder}
      ref={changelogRef}
      onChange={handleChange}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  isDark: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  isLowerCase: PropTypes.bool,
  changelogRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

const Output = ({
  flicker,
  copied,
  value,
  isDark,
  isLowerCase,
  strippedPlaceholder,
  handleCopy,
  outputTextareaRef
}) => {
  let flickr;
  if (flicker && copied) {
    flickr = 'flicker red';
  } else if (copied) {
    flickr = 'red';
  } else {
    flickr = '';
  }

  return (
    <textarea
      id="output"
      value={isLowerCase ? value.toLowerCase() : value}
      className={`split-view ${isDark ? 'dark' : ''} ${flickr}`}
      ref={outputTextareaRef}
      placeholder={
        isLowerCase ? strippedPlaceholder.toLowerCase() : strippedPlaceholder
      }
      onFocus={event => {
        if (event.keycode === undefined) {
          handleCopy();
        }
      }}
      onMouseDown={handleCopy}
      readOnly
    />
  );
};

Output.propTypes = {
  flicker: PropTypes.bool,
  copied: PropTypes.bool,
  value: PropTypes.string,
  isDark: PropTypes.bool,
  isLowerCase: PropTypes.bool,
  strippedPlaceholder: PropTypes.string,
  handleCopy: PropTypes.func,
  outputTextareaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ])
};

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

const SnippetForm = ({ value, isDark, handleChange, onSubmit }) => {
  return (
    <form id="snippetForm" onSubmit={onSubmit}>
      <input
        className={isDark ? 'dark' : ''}
        type="text"
        id="snippetInput"
        value={value}
        placeholder="Enter new snippet"
        autoComplete="off"
        onChange={handleChange}
      />
    </form>
  );
};

SnippetForm.propTypes = {
  value: PropTypes.string,
  isDark: PropTypes.bool,
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func
};

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

const Title = ({ text, isDark, handleCasing, isLowerCase }) => {
  let textColor;

  if (isLowerCase) {
    textColor = 'var(--blue)';
  } else if (isDark) {
    textColor = 'var(--ash)';
  }

  return (
    <div
      onClick={handleCasing}
      onKeyUp={handleCasing}
      role="button"
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <h1
        id="title"
        style={{ color: textColor }}
        className={isDark ? 'dark' : ''}
      >
        {isLowerCase ? text.toLowerCase() : text}
      </h1>
    </div>
  );
};

Title.propTypes = {
  text: PropTypes.string,
  isDark: PropTypes.bool,
  isLowerCase: PropTypes.bool,
  handleCasing: PropTypes.func
};

const ToggleButton = ({ handleOnClick, state, text, isDark }) => {
  const svgStyle = isDark ? { fill: 'var(--ash)' } : {};
  const iconDarkMode = (
    <svg
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm2 0c0-5.514 4.486-10 10-10v20c-5.514 0-10-4.486-10-10z" />
    </svg>
  );

  return (
    <div id="toggle">
      <label className="switch" htmlFor={text}>
        <input
          id={text}
          checked={state}
          type="checkbox"
          onChange={handleOnClick}
        />
        <span className="slider" />
      </label>
      <p id="toggleLabel" className={isDark ? 'dark' : ''}>
        {/* {text} {subline && <span id="subline">{subline}</span>} */}
        {text === 'Dark Mode' ? iconDarkMode : <span id="strike">{text}</span>}
      </p>
    </div>
  );
};

ToggleButton.propTypes = {
  handleOnClick: PropTypes.func,
  state: PropTypes.bool,
  text: PropTypes.string,
  isDark: PropTypes.bool
};

const Wrapper = ({ children, isDark }) => {
  return (
    <div id="wrapper" className={isDark ? 'dark' : ''}>
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  isDark: PropTypes.bool
};

class ReferenceStripper extends React.Component {
  outputTextareaRef = React.createRef();

  changelogRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      input: '',
      placeholder: '',
      output: '',
      updates: [],
      copied: false,
      isDark: false,
      currentVersion: '',
      includeParentheses: false,
      isViewingChangelog: false,
      isLowerCase: false,
      snippet: '',
      snippets: []
    };
  }

  componentDidMount() {
    fetch(
      'https://raw.githubusercontent.com/julienshim/Reference-Stripper/master/public/updates.json'
    )
      .then(response => response.json())
      .then(result => {
        const { updates } = result;
        const currentVersion = `v${updates[0].version}`;
        const rsDark = localStorage.getItem('rs-dark') === 'true';
        const rsIncludeParentheses =
          localStorage.getItem('rs-include-parentheses') === 'true';
        const rsSnippets =
          localStorage.getItem('rs-snippets') === null
            ? []
            : JSON.parse(localStorage.getItem('rs-snippets'));
        const rsString =
          localStorage.getItem('rs-string') === null
            ? ''
            : localStorage.getItem('rs-string');
        const placeholder =
          'Lorem (ipsum sit) amet[1], consectetur elit[citation needed], sed "tempor (ut labore)" (https://en.wikipedia.org/wiki/Lorem_ipsum)[2], dolore (https://en.wikipedia.org/wiki/Lorem_ipsum) magna aliqua (https://en.wikipedia.org/wiki/Lorem_ipsum) ultrices sagittis orci.[3] Ut imperdiet iaculus (rhoncus), placerat quam, vehicula pulvinar.[5]:35 Fusce vestibulum[10]:400,418[11][12][13][14], et ”mattis orci iaculis!”.[5]:35–36';
        const title = 'Reference Stripper';

        this.setState(
          {
            title,
            placeholder,
            updates,
            currentVersion,
            input: rsString,
            includeParentheses: rsIncludeParentheses,
            isDark: rsDark,
            snippets: rsSnippets
          },
          () => {
            const { input } = this.state;
            this.handleChange(input, 'input');
          }
        );
      });
  }

  handleChange = (value, type) => {
    const { snippets } = this.state;
    const newSnippetsArr = snippets;
    for (let i = 0; i < newSnippetsArr.length; i += 1) {
      newSnippetsArr[i].copied = false;
    }
    this.setState(
      { [type]: value, copied: false, snippets: newSnippetsArr },
      () => {
        const { input } = this.state;
        if (type === 'input') {
          localStorage.setItem('rs-string', input);
          this.handleChange(this.handleStrip(input), 'output');
        }
      }
    );
  };

  handleFlicker = () => {
    this.setState({ flicker: true });
    const timer = setTimeout(() => {
      this.setState({ flicker: false });
    }, 75);
    return () => clearTimeout(timer);
  };

  handleWordCount = string => {
    return (
      string
        // strips whitespace (e.g. new line, tab) before counting
        .replace(/\s/g, ' ')
        // strips dashes before counting
        .replace(/[-–]/g, ' ')
        .split(' ')
        .filter(n => {
          return n !== '';
        }).length
    );
  };

  handleCasing = () => {
    this.setState(prevState => ({
      isLowerCase: !prevState.isLowerCase
    }));
  };

  onSubmit = event => {
    event.preventDefault();
    const { snippet } = this.state;
    if (snippet !== '') {
      const isWikiLink = /https:\/\/en.wikipedia.org\/wiki\/([\w%]+)/g.test(
        snippet
      );
      const isHashed = snippet[0] === '#' || isWikiLink;
      const isAt = snippet[0] === '@';
      const isEscapingQuotes = snippet.includes('\\"');
      const cleanSnippet = isEscapingQuotes
        ? snippet.replace(/[@#"]/g, '').replace(/[\\]/g, '"')
        : snippet.replace(/[@#]/g, '');
      // I'll fix this part later, but just to test.
      let cleanSnippetSet;
      if (isHashed || isAt) {
        cleanSnippetSet = isWikiLink
          ? [
              snippet
                .split('/wiki/')[1]
                .replace(/_/g, ' ')
                .replace(/%3F/g, '?')
            ]
          : cleanSnippet.trim().split(/[\s-]{2,}/);
      } else {
        cleanSnippetSet = [snippet];
      }
      // Side by Side Filter Start
      const temp = [];
      for (let i = 0; i < cleanSnippetSet.length; i += 1) {
        if (cleanSnippetSet[i] !== cleanSnippetSet[i - 1]) {
          temp.push(cleanSnippetSet[i]);
        }
      }
      // Side by Side Filter End

      // Unique Keys Filter Start
      // const cleanSnippetArr = [...new Set(cleanSnippetSet)].map(x => {
      // Unique Keys Filter End

      const cleanSnippetArr = [...temp].map(x => {
        return {
          value: x,
          copied: false,
          flicker: false,
          isHashed,
          isAt
        };
      });
      this.setState(
        prevState => ({
          snippets: [...cleanSnippetArr, ...prevState.snippets],
          snippet: ''
        }),
        () => {
          const { snippets } = this.state;
          localStorage.setItem('rs-snippets', JSON.stringify(snippets));
        }
      );
    }
  };

  handleStrip = string => {
    const { includeParentheses } = this.state;
    let isWriting = true;
    let isQuoting = false;
    let hasClosed = true;
    let stripped = '';
    let isReferencing = false;

    // no-plusplus
    for (let i = 0; i < string.length; i += 1) {
      const pURL =
        string[i + 1] === '(' &&
        string[i + 2] === 'h' &&
        string[i + 3] === 't' &&
        string[i + 4] === 't' &&
        string[i + 5] === 'p';

      const pText = string[i + 1] === '(';

      if (string[i] === '[' && !isQuoting) {
        isWriting = false;
        hasClosed = false;
        isReferencing = true;
      }
      // removes embedded (<url>)
      if (!includeParentheses ? pURL : pText) {
        isWriting = false;
        hasClosed = false;
      }
      if (string[i] === ')') {
        hasClosed = true;
      }
      if (string[i] === '"') {
        isQuoting = !isQuoting;
      }
      if (string[i] === ']') {
        hasClosed = true;
        if (string[i + 1] !== ':') {
          isReferencing = false;
        }
      }
      if (string[i + 1] === ' ' && isReferencing) {
        isReferencing = !isReferencing;
      }
      if (
        (string[i].match(/\s/) ||
          string[i] === ',' ||
          string[i] === '.' ||
          string[i] === '!' ||
          string[i] === ';' ||
          string[i] === ':' ||
          string[i] === '"' ||
          string[i] === '?') &&
        hasClosed &&
        !isReferencing
      ) {
        isWriting = true;
      }
      if (isWriting) {
        stripped += string[i];
      }
    }
    return stripped;
  };

  handleCopy = event => {
    const { snippets } = this.state;
    const textareaText = this.outputTextareaRef.current;
    textareaText.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    const newSnippetsArr = snippets;
    for (let i = 0; i < newSnippetsArr.length; i += 1) {
      newSnippetsArr[i].copied = false;
    }
    this.setState({ copied: true, snippets: newSnippetsArr }, () => {
      this.handleFlicker();
    });
  };

  handleToggleDarkMode = () => {
    this.setState(
      prevState => ({
        isDark: !prevState.isDark
      }),
      () => {
        const { isDark } = this.state;
        localStorage.setItem('rs-dark', isDark);
      }
    );
  };

  handleSnippetFlicker = index => {
    const { snippets } = this.state;
    const newSnippetsArr = snippets;
    newSnippetsArr[index].flicker = true;
    this.setState({ snippets: newSnippetsArr });
    const timer = setTimeout(() => {
      newSnippetsArr[index].flicker = false;
      this.setState({ snippets: newSnippetsArr });
    }, 75);
    return () => clearTimeout(timer);
  };

  handleSnippetCopy = (value, index, type) => {
    const { snippets } = this.state;
    if (snippets[index].copied) {
      this.handleSnippetFlicker(index);
    } else {
      const newSnippetsArr = snippets;
      for (let i = 0; i < newSnippetsArr.length; i += 1) {
        newSnippetsArr[i].copied = false;
      }
      newSnippetsArr[index].copied = true;
      this.setState({
        snippets: newSnippetsArr,
        copied: false
      });
    }
    const snippetValue = document
      .getElementById(`${value}-${index}-${type}`)
      .getAttribute('data-value');
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = snippetValue;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  handleRemoveSnippet = position => {
    const { snippets } = this.state;
    const newSnippetsArr = snippets;
    newSnippetsArr.splice(position, 1);
    this.setState(
      {
        snippets: newSnippetsArr
      },
      () => {
        localStorage.setItem('rs-snippets', JSON.stringify(newSnippetsArr));
      }
    );
  };

  handleChangelogView = () => {
    const changelogDiv = this.changelogRef.current;
    changelogDiv.scrollTo(0, 0);
    this.setState(prevState => ({
      isViewingChangelog: !prevState.isViewingChangelog
    }));
  };

  handleClearSnippets = () => {
    const newSnippetsArr = [];
    this.setState(
      {
        snippets: newSnippetsArr
      },
      () => {
        localStorage.setItem('rs-snippets', JSON.stringify(newSnippetsArr));
      }
    );
  };

  handleToggleIncludeParentheses = () => {
    this.setState(
      prevState => ({
        includeParentheses: !prevState.includeParentheses
      }),
      () => {
        const { includeParentheses, input } = this.state;
        localStorage.setItem('rs-include-parentheses', includeParentheses);
        this.handleChange(this.handleStrip(input), 'output');
      }
    );
  };

  render() {
    const {
      isDark,
      isViewingChangelog,
      title,
      updates,
      includeParentheses,
      isLowerCase,
      snippet,
      snippets,
      currentVersion,
      input,
      output,
      copied,
      placeholder,
      flicker
    } = this.state;
    return (
      <Wrapper isDark={isDark}>
        <Changelog
          changelogRef={this.changelogRef}
          handleChangelogView={this.handleChangelogView}
          isViewingChangelog={isViewingChangelog}
          updates={updates}
        />
        <div id="container">
          <div id="header">
            <Title
              text={title}
              isDark={isDark}
              isLowerCase={isLowerCase}
              handleCasing={this.handleCasing}
            />
            <div id="settings-container">
              <div id="toggle-container">
                <ToggleButton
                  state={isDark}
                  handleOnClick={this.handleToggleDarkMode}
                  text="Dark Mode"
                  isDark={isDark}
                />
                <ToggleButton
                  state={includeParentheses}
                  handleOnClick={this.handleToggleIncludeParentheses}
                  text="( text )"
                  isDark={isDark}
                />
              </div>
              <SnippetForm
                value={snippet}
                isDark={isDark}
                onSubmit={this.onSubmit}
                handleChange={event => {
                  this.handleChange(event.target.value, 'snippet');
                }}
              />
            </div>
            <ChangelogButton
              handleChangelogView={this.handleChangelogView}
              isDark={isDark}
              currentVersion={currentVersion}
            />
          </div>
          {snippets.length > 0 && (
            <SnippetsContainer
              snippets={snippets}
              isDark={isDark}
              handleSnippetCopy={this.handleSnippetCopy}
              handleClearSnippets={this.handleClearSnippets}
              handleRemoveSnippet={this.handleRemoveSnippet}
            />
          )}
          <div id="main">
            <div id="editor">
              <Input
                value={input}
                isDark={isDark}
                isLowerCase={isLowerCase}
                placeholder={placeholder}
                changelogRef={this.changelogRef}
                handleChange={event => {
                  this.handleChange(event.target.value, 'input');
                }}
              />
            </div>
            <div id="preview">
              <Output
                flicker={flicker}
                copied={copied}
                value={output}
                isDark={isDark}
                isLowerCase={isLowerCase}
                strippedPlaceholder={this.handleStrip(placeholder)}
                handleCopy={this.handleCopy}
                outputTextareaRef={this.outputTextareaRef}
              />
              <CircularProgressBar
                wordCount={this.handleWordCount(output)}
                size={25}
              />
              <ConfirmButton
                text={output}
                input={input}
                handleCopy={this.handleCopy}
                isDark={isDark}
                copied={copied}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

ReactDOM.render(<ReferenceStripper />, document.getElementById('app'));
