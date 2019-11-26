/* eslint-disable */

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
      ref={changelogRef}
    >
      <div>
        <ul>
          <li>
            <h1>Changelog</h1>
          </li>
          {updates.map(update => {
            return (
              <li className="changelog-li" key={update.version}>
                <h2>
                  <span>{`v${update.version}`}</span>
                  {update.date}
                </h2>
                <p>{update.change}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
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
    <p id="changelogButton" onClick={handleChangelogView}>
      <span>{currentVersion}</span> {isDark ? noteDark : note}
    </p>
  );
};

const CircularProgressBar = ({ wordCount, size }) => {
  const percentage = (wordCount / 30) * 100;
  const radius = size;
  const strokeWidth = radius / 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const backgroundStyle = {
    strokeDashoffset,
    stroke:
      wordCount < 30
        ? 'var(--ash)'
        : wordCount < 40
        ? 'var(--peach)'
        : 'transparent'
  };
  const progressStyle = {
    strokeDashoffset,
    stroke:
      wordCount < 20
        ? 'var(--blue)'
        : wordCount < 30
        ? 'var(--tangerine)'
        : wordCount < 40
        ? 'var(--peach)'
        : 'transparent'
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

const ConfirmButton = ({ className, label, handleCopy, style }) => (
  <div id="confirm" className={className} onClick={handleCopy} style={style}>
    {label}
  </div>
);

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
  const wikiRef = `https://en.wikipedia.org/wiki/${value.split(' ').join('_')}`;
  const hashCheckedValue =
    isHashed && value.includes('(')
      ? `the ${value
          .replace(/[(]/g, '#')
          .replace(/[)]/g, '')
          .split(/[#\s]{2,}/)
          .reverse()
          .join(' ')}`
      : value;
  return (
    <div className="snippet-container">
      <div className="snippet">
        <div
          id={`${value}-${index}`}
          className="snippet-label"
          style={
            isCopied && !flicker
              ? { background: 'var(--peach)' }
              : isDark
              ? { background: 'var(--ash)' }
              : { background: 'var(--faded-ash)' }
          }
          data-value={hashCheckedValue}
          onClick={handleSnippetCopy}
        >
          {value.length <= 30 ? value : `${value.slice(0, 30).trim()}...`}
        </div>
        {isHashed && (
          <a
            href={wikiRef}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            target="_blank"
          >
            <div className="wiki">W</div>
          </a>
        )}
        {isHashed && value.includes('(') && (
          <div className="strike-tag">
            <span style={{ color: 'var(--charcoal)' }} id="switch">
              ( )
            </span>
          </div>
        )}
        <div className="delete-tag" onClick={handleRemoveSnippet}>
          X
        </div>
      </div>
    </div>
  );
};

const Title = ({ text, isDark }) => (
  <h1 id="title" className={isDark ? 'dark' : ''}>
    {text}
  </h1>
);

const ToggleButton = ({ handleOnClick, handleState, text, isDark }) => {
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
      <label className="switch">
        <input checked={handleState} type="checkbox" onChange={handleOnClick} />
        <span className="slider" />
      </label>
      <p id="toggleLabel" className={isDark ? 'dark' : ''}>
        {/* {text} {subline && <span id="subline">{subline}</span>} */}
        {text === 'Dark Mode' ? iconDarkMode : <span id="strike">{text}</span>}
      </p>
    </div>
  );
};

const Wrapper = ({ children, isDark }) => {
  return (
    <div id="wrapper" className={isDark ? 'dark' : ''}>
      {children}
    </div>
  );
};

class ReferenceStripper extends React.Component {
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
        const isDark = localStorage.getItem('rs-dark') === 'true';
        const includeParentheses =
          localStorage.getItem('rs-include-parentheses') === 'true';
        const snippets =
          localStorage.getItem('rs-snippets') === null
            ? []
            : JSON.parse(localStorage.getItem('rs-snippets'));
        const input =
          localStorage.getItem('rs-string') === null
            ? ''
            : localStorage.getItem('rs-string');
        const placeholder =
          'Lorem (ipsum sit) amet[1], consectetur elit[citation needed], sed "tempor (ut labore)" (https://en.wikipedia.org/wiki/Lorem_ipsum)[2], dolore (https://en.wikipedia.org/wiki/Lorem_ipsum) magna aliqua (https://en.wikipedia.org/wiki/Lorem_ipsum) ultrices sagittis orci.[3] Ut imperdiet iaculus (rhoncus), placerat quam, vehicula pulvinar.[5]:35 Fusce vestibulum[10]:400,418[11][12][13][14], et ”mattis orci iaculis!”.[5]:35–36';
        const title = 'Reference Stripper';
        const { updates } = result;
        const currentVersion = `v${result.updates[0].version}`;

        this.setState(
          {
            title,
            placeholder,
            updates,
            currentVersion,
            input,
            includeParentheses,
            isDark,
            snippets
          },
          () => {
            this.handleChange(this.state.input, 'input');
          }
        );
      });
  }

  handleChange = (value, type) => {
    const newSnippetsArr = this.state.snippets;
    newSnippetsArr.forEach(x => (x.copied = false));
    this.setState(
      { [type]: value, copied: false, snippets: newSnippetsArr },
      () => {
        if (type === 'input') {
          localStorage.setItem('rs-string', this.state.input);
          this.handleChange(this.handleStrip(this.state.input), 'output');
        }
        if (type === 'snippet') {
          // console.log(this.state.snippet);
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
        .filter(function(n) {
          return n != '';
        }).length
    );
  };

  onSubmit = event => {
    event.preventDefault();
    const isHashed = this.state.snippet[0] === '#';
    const isEscapingQuotes = this.state.snippet.includes('\\"');
    const cleanSnippet = isEscapingQuotes
      ? this.state.snippet
          .replace(/[\"]/g, '')
          .replace(/[#]/g, ' ')
          .replace(/[\\]/g, '"')
      : this.state.snippet.replace(/[#]/g, ' ');
    const cleanSnippetSet = isHashed
      ? cleanSnippet.trim().split(/\s{2,}/)
      : [this.state.snippet];
    const cleanSnippetArr = [...new Set(cleanSnippetSet)].map(x => {
      return {
        value: x,
        copied: false,
        flicker: false,
        isHashed
      };
    });

    // console.log(isHashed, cleanSnippetArr)
    // const newSnippetObject = {
    //   value: this.state.snippet,
    //   copied: false,
    //   flicker: false
    // };
    this.setState(
      prevState => ({
        snippets: [...cleanSnippetArr, ...prevState.snippets],
        snippet: ''
      }),
      () => {
        // console.log(this.state.snippets);
        localStorage.setItem(
          'rs-snippets',
          JSON.stringify(this.state.snippets)
        );
      }
    );
  };

  handleStrip = string => {
    let isWriting = true;
    let isQuoting = false;
    let hasClosed = true;
    let stripped = '';
    let isReferencing = false;

    for (let i = 0; i < string.length; i++) {
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
      if (!this.state.includeParentheses ? pURL : pText) {
        isWriting = false;
        hasClosed = false;
      }
      if (string[i] === ')') {
        hasClosed = true;
        isWriting == true;
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

  outputTextareaRef = React.createRef();

  changelogRef = React.createRef();

  handleCopy = event => {
    const textareaText = this.outputTextareaRef.current;
    textareaText.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    const newSnippetsArr = this.state.snippets;
    newSnippetsArr.forEach(x => (x.copied = false));
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
        localStorage.setItem('rs-dark', this.state.isDark);
      }
    );
  };

  handleSnippetFlicker = index => {
    const newSnippetsArr = this.state.snippets;
    newSnippetsArr[index].flicker = true;
    this.setState({ snippets: newSnippetsArr });
    const timer = setTimeout(() => {
      newSnippetsArr[index].flicker = false;
      this.setState({ snippets: newSnippetsArr });
    }, 75);
    return () => clearTimeout(timer);
  };

  handleSnippetCopy = (value, index) => {
    if (this.state.snippets[index].copied) {
      this.handleSnippetFlicker(index);
    } else {
      const newSnippetsArr = this.state.snippets;
      newSnippetsArr.forEach(x => (x.copied = false));
      newSnippetsArr[index].copied = true;
      this.setState(
        {
          snippets: newSnippetsArr,
          copied: false
        },
        () => {
          // console.log(this.state.snippets[index]);
        }
      );
    }
    // console.log(
    //   "snippet",
    const snippetValue = document
      .getElementById(`${value}-${index}`)
      .getAttribute('data-value');
    // );
    // this.setState({ copied: true }, () => {
    //   console.log("snippet is copied", this.state.copied)
    // });
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = snippetValue;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  handleRemoveSnippet = position => {
    const newSnippetsArr = this.state.snippets;
    newSnippetsArr.splice(position, 1);
    this.setState({
      snippets: newSnippetsArr
    });
    // console.log("in here");
    localStorage.setItem('rs-snippets', JSON.stringify(this.state.snippets));
  };

  handleChangelogView = () => {
    const changelogDiv = this.changelogRef.current;
    changelogDiv.scrollTo(0, 0);
    this.setState(prevState => ({
      isViewingChangelog: !prevState.isViewingChangelog
    }));
  };

  handleClearSnippets = () => {
    this.setState(
      {
        snippets: []
      },
      () => {
        localStorage.setItem(
          'rs-snippets',
          JSON.stringify(this.state.snippets)
        );
      }
    );
  };

  handleToggleIncludeParentheses = () => {
    this.setState(
      prevState => ({
        includeParentheses: !prevState.includeParentheses
      }),
      () => {
        localStorage.setItem(
          'rs-include-parentheses',
          this.state.includeParentheses
        );
        this.handleChange(this.handleStrip(this.state.input), 'output');
      }
    );
  };

  render() {
    const flickr =
      this.state.flicker && this.state.copied
        ? 'flicker red'
        : this.state.copied
        ? 'red'
        : '';

    const themeDark = {
      color: this.state.copied ? '' : 'var(--ash)'
    };

    const theme = this.state.isDark ? themeDark : {};

    return (
      <Wrapper isDark={this.state.isDark} isDark={this.state.isDark}>
        <Changelog
          changelogRef={this.changelogRef}
          handleChangelogView={this.handleChangelogView}
          isViewingChangelog={this.state.isViewingChangelog}
          updates={this.state.updates}
        />
        <div id="container">
          <div id="header">
            <Title text={this.state.title} isDark={this.state.isDark} />
            <div id="settings-container">
              <div id="toggle-container">
                <ToggleButton
                  handleState={this.state.isDark}
                  handleOnClick={this.handleToggleDarkMode}
                  text="Dark Mode"
                  isDark={this.state.isDark}
                />
                <ToggleButton
                  handleState={this.state.includeParentheses}
                  handleOnClick={this.handleToggleIncludeParentheses}
                  text="( text )"
                  isDark={this.state.isDark}
                />
              </div>
              <form id="snippetForm" onSubmit={this.onSubmit}>
                <input
                  // style={{border: "2px solid pink"}}
                  className={this.state.isDark ? 'dark' : ''}
                  type="text"
                  id="snippetInput"
                  value={this.state.snippet}
                  placeholder="Enter new snippet"
                  autoComplete="off"
                  onChange={event =>
                    this.handleChange(event.target.value, 'snippet')
                />
                {/* <button style={{display: "none"}} className="button" type="submit">
            Save Expense
              </button> */}
              </form>
            </div>
            <ChangelogButton
              handleChangelogView={this.handleChangelogView}
              isDark={this.state.isDark}
              currentVersion={this.state.currentVersion}
            />
          </div>
          {this.state.snippets.length > 0 && (
            <div className="snippet-container">
              <div
                id="snippetContainer"
                onWheel={event => {
                  // event.preventDefault();
                  const container = document.getElementById('snippetContainer');
                  const containerScrollPosition = document.getElementById(
                    'snippetContainer'
                  ).scrollLeft;
                  container.scrollTo({
                    top: 0,
                    left: containerScrollPosition + event.deltaY,
                    behaviour: 'smooth'
                  });
                }}
              >
                {this.state.snippets.map((snippet, index) => (
                  <Snippet
                    key={`${snippet.value}-${index}`}
                    flicker={snippet.flicker}
                    isCopied={snippet.copied}
                    index={index}
                    isDark={this.state.isDark}
                    value={snippet.value}
                    isHashed={snippet.isHashed === true}
                                        f
                    handleSnippetCopy={() =>
                      this.handleSnippetCopy(snippet.value, index)
                    }
                    handleRemoveSnippet={() => this.handleRemoveSnippet(index)}
                  />
                ))}
              </div>{' '}
              <div>
                <svg
                  onClick={this.handleClearSnippets}
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
          )}
          <div id="main">
            <div id="editor">
              <textarea
                id="input"
                value={this.state.input}
                className={`split-view ${this.state.isDark ? 'dark' : ''}`}
                placeholder={this.state.placeholder}
                ref={ref => (this.input = ref)}
                onChange={event => {
                  this.handleChange(event.target.value, 'input');
                }}
              />
            </div>
            <div id="preview">
              <textarea
                id="output"
                value={this.state.output}
                className={`split-view ${
                  this.state.isDark ? 'dark' : ''
                } ${flickr}`}
                ref={this.outputTextareaRef}
                placeholder={this.handleStrip(this.state.placeholder)}
                onFocus={this.handleCopy}
                onMouseDown={this.handleCopy}
                readOnly
              />
              <CircularProgressBar
                wordCount={this.handleWordCount(this.state.output)}
                size={25}
              />
              <ConfirmButton
                className={this.state.copied ? 'red confirm' : 'confirm'}
                text={this.state.output}
                label={
                  this.state.copied
                    ? this.state.input !== ''
                      ? 'Copied!'
                      : 'Nothing to Copy!'
                    : 'Copy'
                }
                handleCopy={this.handleCopy}
                style={theme}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

ReactDOM.render(<ReferenceStripper />, document.getElementById('app'));
