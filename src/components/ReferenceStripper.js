import React from 'react';
import CircularProgressBar from './CircularProgressBar';
import Title from './Title';
import ConfirmButton from './ConfirmButton';
import Wrapper from './Wrapper';
import ChangelogButton from './ChangelogButton';
import Changelog from './Changelog';
import Settings from './Settings';
import PanelShell from './PanelShell';
import SnippetForm from './SnippetForm';
import BarContainer from './BarContainer';
import Output from './Output';
import Input from './Input';

export default class ReferenceStripper extends React.Component {
  outputTextareaRef = React.createRef();

  changelogRef = React.createRef();

  settingsPanelRef = React.createRef();

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
      isViewingSettingsPanel: false,
      isLowerCase: false,
      snippet: '',
      snippets: [],
      presets: { first: '', second: '' },
      wordCountLimit: 30,
      specialCharactersUser: '? !',
      specialCharactersFound: [],
    };
  }

  componentDidMount() {
    fetch(
      'updates.json'
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
        const rsWCL =
          localStorage.getItem('rs-wcl') === null
            ? 30
            : +localStorage.getItem('rs-wcl');
        const rsSCU =
          localStorage.getItem('rs-scu') === null
            ? ''
            : localStorage.getItem('rs-scu');
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
            wordCountLimit: rsWCL,
            specialCharactersUser: rsSCU,
          },
          () => {
            const { input } = this.state;
            this.handleChange(input, 'input');
          }
        );
      });
  }

  handleChange = (value, type) => {
    const { snippets, specialCharactersUser } = this.state;
    const newSnippetsArr = snippets;
    for (let i = 0; i < newSnippetsArr.length; i += 1) {
      newSnippetsArr[i].copied = false;
    }
    const flag = [];

    [...new Set(specialCharactersUser.split(/\s/).filter((x) => x))].forEach(
      (char) => {
        if (value.toLowerCase().includes(char.toLowerCase())) {
          flag.push(char);
        }
      }
    );
    this.setState(
      {
        [type]: value,
        copied: false,
        snippets: newSnippetsArr,
        specialCharactersFound: flag,
      },
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

  handleWordCountLimit = (value) => {
    let numify = value.match(/\d{1,5}/) ? +value.match(/\d{1,5}/)[0] : 0;

    if (+value) {
      if (value.length <= 5) {
        numify = +value;
      } else {
        numify = +value.slice(0, 5);
      }
    }
    this.setState(
      {
        wordCountLimit: numify,
      },
      () => {
        localStorage.setItem('rs-wcl', numify);
      }
    );
  };

  handleSpecialCharacters = (value) => {
    this.setState(
      {
        specialCharactersUser: value,
      },
      () => {
        localStorage.setItem('rs-scu', value);
        const { input } = this.state;
        this.handleChange(this.handleStrip(input), 'output');
      }
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
                .replace(/%C3%A9/g, 'é')
                .replace(/%26/g, '&'),
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

  handlePopUpView = (target, view) => {
    const changelogDiv = this[view].current;
    changelogDiv.scrollTo(0, 0);
    this.setState((prevState) => ({
      [target]: !prevState[target],
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

  onDragStart = (event, index) => {
    const { snippets } = this.state;
    const draggableItemEvent = event;
    this.draggedItem = snippets[index];
    draggableItemEvent.dataTransfer.effectAllowed = 'move';
    draggableItemEvent.dataTransfer.setData(
      'text/html',
      draggableItemEvent.target.parentNode
    );
    draggableItemEvent.dataTransfer.setDragImage(
      draggableItemEvent.target.parentNode,
      20,
      20
    );
  };

  onDragOver = (index) => {
    const { snippets } = this.state;
    const draggedOverItem = snippets[index];
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    const items = snippets.filter((snippet) => snippet !== this.draggedItem);
    items.splice(index, 0, this.draggedItem);
    this.setState({ snippets: items }, () => {
      localStorage.setItem('rs-snippets', JSON.stringify(items));
    });
  };

  onDragEnd = () => {
    this.draggedIndex = null;
  };

  render() {
    const {
      isDark,
      isViewingChangelog,
      isViewingSettingsPanel,
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
      specialCharactersUser,
      specialCharactersFound,
      presets,
      wordCountLimit,
    } = this.state;
    return (
      <Wrapper isDark={isDark}>
        <PanelShell
          panelRef={this.changelogRef}
          handlePopUpView={this.handlePopUpView}
          isViewingPanel={isViewingChangelog}
          target="isViewingChangelog"
          view="changelogRef"
          id="changelog"
        >
          <Changelog updates={updates} />
        </PanelShell>
        <PanelShell
          panelRef={this.settingsPanelRef}
          handlePopUpView={this.handlePopUpView}
          isViewingPanel={isViewingSettingsPanel}
          target="isViewingSettingsPanel"
          view="settingsPanelRef"
          id="settingsPanel"
        >
          <Settings
            handleToggleDarkMode={this.handleToggleDarkMode}
            handleToggleIncludeParentheses={this.handleToggleIncludeParentheses}
            isDark={isDark}
            wordCountLimit={wordCountLimit}
            includeParentheses={includeParentheses}
            handleWordCountLimit={this.handleWordCountLimit}
            handleSpecialCharacters={this.handleSpecialCharacters}
            specialCharactersUser={specialCharactersUser}
          />
        </PanelShell>
        <div id="container">
          <div id="header">
            <Title
              text={title}
              isDark={isDark}
              isLowerCase={isLowerCase}
              handleCasing={this.handleCasing}
              handlePopUpView={this.handlePopUpView}
            />
            <div id="settings-container">
              <div id="toggle-container" />
              <SnippetForm
                value={snippet}
                isDark={isDark}
                onSubmit={this.onSubmit}
                handleChange={(event) => {
                  this.handleChange(event.target.value, 'snippet');
                }}
              />
            </div>
          </div>
          <BarContainer
            snippets={snippets}
            presets={presets}
            isDark={isDark}
            handleSnippetCopy={this.handleSnippetCopy}
            handleClearSnippets={this.handleClearSnippets}
            handleRemoveSnippet={this.handleRemoveSnippet}
            handleLoadPreset={this.handleLoadPreset}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            onDragOver={this.onDragOver}
          />
          <div id="main">
            <div id="editor">
              <Input
                value={input}
                isDark={isDark}
                isLowerCase={isLowerCase}
                placeholder={placeholder}
                specialCharactersFound={specialCharactersFound}
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
                wordCountLimit={wordCountLimit}
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
        <ChangelogButton
          handlePopUpView={this.handlePopUpView}
          isDark={isDark}
          currentVersion={currentVersion}
        />
      </Wrapper>
    );
  }
}
