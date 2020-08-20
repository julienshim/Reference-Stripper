import React from 'react';
import CircularProgressBar from './CircularProgressBar';
import Title from './Title';
import ConfirmButton from './ConfirmButton';
import ToggleButton from './ToggleButton';
import Wrapper from './Wrapper';
import ChangelogButton from './ChangelogButton';
import Changelog from './Changelog';
import SnippetForm from './SnippetForm';
import BarContainer from './BarContainer';
import Output from './Output';
import Input from './Input';

export default class ReferenceStripper extends React.Component {
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
      snippets: [],
      presets: { first: '', second: '' },
    };
  }

  componentDidMount() {
    fetch(
      'https://raw.githubusercontent.com/julienshim/Reference-Stripper/master/public/updates.json'
    )
      .then((response) => response.json())
      .then((result) => {
        const { updates } = result;
        const currentVersion = `v${updates[0].version}`;
        const rsDark = localStorage.getItem('rs-dark') === 'true';
        const rsIncludeParentheses =
          localStorage.getItem('rs-include-parentheses') === 'true';
        const rsPresets =
          localStorage.getItem('rs-presets') === null
            ? { first: '', second: '' }
            : JSON.parse(localStorage.getItem('rs-presets'));
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
            snippets: rsSnippets,
            presets: rsPresets,
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

  handleWordCount = (string) => {
    return (
      string
        // strips whitespace (e.g. new line, tab) before counting
        .replace(/\s/g, ' ')
        // strips dashes before counting
        .replace(/[-–]/g, ' ')
        .split(' ')
        .filter((n) => {
          return n !== '';
        }).length
    );
  };

  handleCasing = () => {
    this.setState((prevState) => ({
      isLowerCase: !prevState.isLowerCase,
    }));
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { snippet } = this.state;
    if (snippet !== '') {
      const isWikiLink = /https:\/\/en.wikipedia.org\/wiki\/([\w%]+)/g.test(
        snippet
      );
      const { input, presets } = this.state;
      const isHashed = snippet[0] === '#' || isWikiLink;
      const presetMatch = snippet.match(/^[$preset]+[1-2]{1,1}$/g);
      const isPreset = presetMatch !== null;
      let presetPosition;
      if (isPreset) {
        if (presetMatch[0][presetMatch[0].length - 1] === '1') {
          presetPosition = 'first';
        } else if (presetMatch[0][presetMatch[0].length - 1] === '2') {
          presetPosition = 'second';
        }
      }

      const presetValue = input;
      const newPresetObject = presets;
      newPresetObject[presetPosition] = presetValue;

      if (isPreset) {
        this.setState(
          {
            input: '',
            output: '',
            presets: newPresetObject,
          },
          () => {
            localStorage.setItem('rs-presets', JSON.stringify(presets));
          }
        );
      }
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
                .split('#')[0]
                .replace(/_/g, ' ')
                .replace(/%3F/g, '?')
                .replace(/%27/g, "'")
                .replace(/%C3%A9/g, 'é'),
            ]
          : cleanSnippet.trim().split(/[\s-]{2,}/);
      } else {
        cleanSnippetSet = !isPreset && [snippet];
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

      const cleanSnippetArr = [...temp].map((x) => {
        return {
          value: x,
          copied: false,
          flicker: false,
          isHashed,
          isAt,
        };
      });
      this.setState(
        (prevState) => ({
          snippets: [...cleanSnippetArr, ...prevState.snippets],
          snippet: '',
        }),
        () => {
          const { snippets } = this.state;
          localStorage.setItem('rs-snippets', JSON.stringify(snippets));
        }
      );
    }
  };

  handleStrip = (string) => {
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

  handleCopy = (event) => {
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
      (prevState) => ({
        isDark: !prevState.isDark,
      }),
      () => {
        const { isDark } = this.state;
        localStorage.setItem('rs-dark', isDark);
      }
    );
  };

  handleSnippetFlicker = (index) => {
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

  handleLoadPreset = (id) => {
    const presetValue = document
      .getElementById(`preset-${id}`)
      .getAttribute('data-preset');
    this.setState(
      {
        input: presetValue,
      },
      () => {
        const { input } = this.state;
        localStorage.setItem('rs-string', input);
        this.handleChange(this.handleStrip(input), 'output');
      }
    );
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
        copied: false,
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

  handleRemoveSnippet = (position) => {
    const { snippets } = this.state;
    const newSnippetsArr = snippets;
    newSnippetsArr.splice(position, 1);
    this.setState(
      {
        snippets: newSnippetsArr,
      },
      () => {
        localStorage.setItem('rs-snippets', JSON.stringify(newSnippetsArr));
      }
    );
  };

  handleChangelogView = () => {
    const changelogDiv = this.changelogRef.current;
    changelogDiv.scrollTo(0, 0);
    this.setState((prevState) => ({
      isViewingChangelog: !prevState.isViewingChangelog,
    }));
  };

  handleClearSnippets = () => {
    const newSnippetsArr = [];
    this.setState(
      {
        snippets: newSnippetsArr,
      },
      () => {
        localStorage.setItem('rs-snippets', JSON.stringify(newSnippetsArr));
      }
    );
  };

  handleToggleIncludeParentheses = () => {
    this.setState(
      (prevState) => ({
        includeParentheses: !prevState.includeParentheses,
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
      flicker,
      presets,
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
                handleChange={(event) => {
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
          <BarContainer
            snippets={snippets}
            presets={presets}
            isDark={isDark}
            handleSnippetCopy={this.handleSnippetCopy}
            handleClearSnippets={this.handleClearSnippets}
            handleRemoveSnippet={this.handleRemoveSnippet}
            handleLoadPreset={this.handleLoadPreset}
          />
          <div id="main">
            <div id="editor">
              <Input
                value={input}
                isDark={isDark}
                isLowerCase={isLowerCase}
                placeholder={placeholder}
                changelogRef={this.changelogRef}
                handleChange={(event) => {
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
