import React from "react";
import CircularProgressBar from "./CircularProgressBar";
import Title from "./Title";
import ConfirmButton from "./ConfirmButton";
import ToggleButton from "./ToggleButton";
import Wrapper from "./Wrapper";
import ChangelogButton from "./ChangelogButton";
import Changelog from "./Changelog";
import SnippetForm from "./SnippetForm";
import SnippetsContainer from "./SnippetsContainer";
import Output from "./Output";
import Input from "./Input";

export default class ReferenceStripper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      input: "",
      placeholder: "",
      output: "",
      updates: [],
      copied: false,
      isDark: false,
      currentVersion: "",
      includeParentheses: false,
      isViewingChangelog: false,
      snippet: "",
      snippets: []
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/julienshim/Reference-Stripper/master/public/updates.json"
    )
      .then(response => response.json())
      .then(result => {
        const isDark = localStorage.getItem("rs-dark") === "true";
        const includeParentheses =
          localStorage.getItem("rs-include-parentheses") === "true";
        const snippets =
          localStorage.getItem("rs-snippets") === null
            ? []
            : JSON.parse(localStorage.getItem("rs-snippets"));
        const input =
          localStorage.getItem("rs-string") === null
            ? ""
            : localStorage.getItem("rs-string");
        const placeholder =
          'Lorem (ipsum sit) amet[1], consectetur elit[citation needed], sed "tempor (ut labore)" (https://en.wikipedia.org/wiki/Lorem_ipsum)[2], dolore (https://en.wikipedia.org/wiki/Lorem_ipsum) magna aliqua (https://en.wikipedia.org/wiki/Lorem_ipsum) ultrices sagittis orci.[3] Ut imperdiet iaculus (rhoncus), placerat quam, vehicula pulvinar.[5]:35 Fusce vestibulum[10]:400,418[11][12][13][14], et ”mattis orci iaculis!”.[5]:35–36';
        const title = "Reference Stripper";
        const updates = result.updates;
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
            this.handleChange(this.state.input, "input");
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
        if (type === "input") {
          localStorage.setItem("rs-string", this.state.input);
          this.handleChange(this.handleStrip(this.state.input), "output");
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
        .replace(/\s/g, " ")
        // strips dashes before counting
        .replace(/[-–]/g, " ")
        .split(" ")
        .filter(function(n) {
          return n != "";
        }).length
    );
  };

  onSubmit = event => {
    event.preventDefault();
    const isHashed = this.state.snippet[0] === "#";
    const isAt = this.state.snippet[0] === "@";
    const isEscapingQuotes = this.state.snippet.includes('\\"');
    const cleanSnippet = isEscapingQuotes
      ? this.state.snippet.replace(/[@#\"]/g, "").replace(/[\\]/g, '"')
      : this.state.snippet.replace(/[@#]/g, "");
    const cleanSnippetSet =
      isHashed || isAt
        ? cleanSnippet.trim().split(/\s{2,}/)
        : [this.state.snippet];
    const cleanSnippetArr = [...new Set(cleanSnippetSet)].map(x => {
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
        snippet: ""
      }),
      () => {
        localStorage.setItem(
          "rs-snippets",
          JSON.stringify(this.state.snippets)
        );
      }
    );
  };

  handleStrip = string => {
    let isWriting = true;
    let isQuoting = false;
    let hasClosed = true;
    let stripped = "";
    let isReferencing = false;

    for (let i = 0; i < string.length; i++) {
      const pURL =
        string[i + 1] === "(" &&
        string[i + 2] === "h" &&
        string[i + 3] === "t" &&
        string[i + 4] === "t" &&
        string[i + 5] === "p";

      const pText = string[i + 1] === "(";

      if (string[i] === "[" && !isQuoting) {
        isWriting = false;
        hasClosed = false;
        isReferencing = true;
      }
      // removes embedded (<url>)
      if (!this.state.includeParentheses ? pURL : pText) {
        isWriting = false;
        hasClosed = false;
      }
      if (string[i] === ")") {
        hasClosed = true;
        isWriting == true;
      }
      if (string[i] === '"') {
        isQuoting = !isQuoting;
      }
      if (string[i] === "]") {
        hasClosed = true;
        if (string[i + 1] !== ":") {
          isReferencing = false;
        }
      }
      if (string[i + 1] === " " && isReferencing) {
        isReferencing = !isReferencing;
      }
      if (
        (string[i].match(/\s/) ||
          string[i] === "," ||
          string[i] === "." ||
          string[i] === "!" ||
          string[i] === ";" ||
          string[i] === ":" ||
          string[i] === '"' ||
          string[i] === "?") &&
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
    document.execCommand("copy");
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
        localStorage.setItem("rs-dark", this.state.isDark);
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
      this.setState({
        snippets: newSnippetsArr,
        copied: false
      });
    }
    const snippetValue = document
      .getElementById(`${value}-${index}`)
      .getAttribute("data-value");
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = snippetValue;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  handleRemoveSnippet = position => {
    const newSnippetsArr = this.state.snippets;
    newSnippetsArr.splice(position, 1);
    this.setState({
      snippets: newSnippetsArr
    });
    // console.log("in here");
    localStorage.setItem("rs-snippets", JSON.stringify(this.state.snippets));
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
          "rs-snippets",
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
          "rs-include-parentheses",
          this.state.includeParentheses
        );
        this.handleChange(this.handleStrip(this.state.input), "output");
      }
    );
  };

  render() {


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
                  text={"Dark Mode"}
                  isDark={this.state.isDark}
                />
                <ToggleButton
                  handleState={this.state.includeParentheses}
                  handleOnClick={this.handleToggleIncludeParentheses}
                  text={"( text )"}
                  isDark={this.state.isDark}
                />
              </div>
              <SnippetForm
                value={this.state.snippet}
                isDark={this.state.isDark}
                onSubmit={this.onSubmit}
                handleChange={event =>
                  this.handleChange(event.target.value, "snippet")
                }
              />
            </div>
            <ChangelogButton
              handleChangelogView={this.handleChangelogView}
              isDark={this.state.isDark}
              currentVersion={this.state.currentVersion}
            />
          </div>
          {this.state.snippets.length > 0 && (
            <SnippetsContainer
              snippets={this.state.snippets}
              isDark={this.state.isDark}
              handleSnippetCopy={this.handleSnippetCopy}
              handleClearSnippets={this.handleClearSnippets}
              handleRemoveSnippet={this.handleRemoveSnippet}
            />
          )}
          <div id="main">
            <div id="editor">
              <Input 
                value={this.state.input}
                isDark={this.state.isDark}
                placeholder={this.state.placeholder}
                changelogRef={this.changelogRef}
                handleChange={event => {
    this.handleChange(event.target.value, "input");
  }}
              />
            </div>
            <div id="preview">
              <Output 
                flicker={this.state.flicker}
                copied={this.state.copied}
                value={this.state.output}
                isDark={this.state.isDark}
                handleStrip={this.handleStrip(this.state.placeholder)}
                handleCopy={this.handleCopy}
                outputTextareaRef={this.outputTextareaRef}
              />
              <CircularProgressBar
                wordCount={this.handleWordCount(this.state.output)}
                size={25}
              />
              <ConfirmButton
                className={this.state.copied ? "red confirm" : "confirm"}
                text={this.state.output}
                label={
                  this.state.copied
                    ? this.state.input !== ""
                      ? "Copied!"
                      : "Nothing to Copy!"
                    : "Copy"
                }
                handleCopy={this.handleCopy}
                isDark={this.state.isDark}
                copied={this.state.copied}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
