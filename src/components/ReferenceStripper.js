import React from "react";
import CircularProgressBar from "./CircularProgressBar";
import Title from "./Title";
import ConfirmButton from "./ConfirmButton";
import ToggleButton from "./ToggleButton";
import Wrapper from "./Wrapper";
import ChangelogButton from "./ChangelogButton";
import Changelog from "./Changelog";

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
      isViewingChangelog: false
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
        const input =
          localStorage.getItem("rs-string") === null
            ? ""
            : localStorage.getItem("rs-string");
        const placeholder =
          "Lorem (ipsum sit) amet[1], consectetur elit[citation needed], sed tempor ut labore (https://en.wikipedia.org/wiki/Lorem_ipsum)[2], dolore (https://en.wikipedia.org/wiki/Lorem_ipsum) magna aliqua (https://en.wikipedia.org/wiki/Lorem_ipsum) ultrices sagittis orci.[3] Ut imperdiet iaculus (rhoncus), placerat quam, vehicula pulvinar.[5]:35 Fusce vestibulum[10]:400,418[11][12][13][14], et ”mattis orci iaculis!”.[5]:35–36";
        const title = "Reference Stripper";
        const updates = result.updates;
        const currentVersion = result.updates[0].version;

        this.setState(
          {
            title,
            placeholder,
            updates,
            currentVersion,
            input,
            includeParentheses,
            isDark
          },
          () => {
            this.handleChange(this.state.input, "input");
          }
        );
      });
  }

  handleChange = (value, type) => {
    this.setState({ [type]: value, copied: false }, () => {
      if (type === "input") {
        localStorage.setItem("rs-string", this.state.input);
        this.handleChange(this.handleStrip(this.state.input), "output");
      }
    });
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
    this.setState({ copied: true }, () => {
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

  handleChangelogView = () => {
    const changelogDiv = this.changelogRef.current;
    changelogDiv.scrollTo(0, 0);
    this.setState(prevState => ({
      isViewingChangelog: !prevState.isViewingChangelog
    }));
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
    const flickr =
      this.state.flicker && this.state.copied
        ? "flicker red"
        : this.state.copied
        ? "red"
        : "";

    const themeDark = {
      color: this.state.copied ? "" : "var(--ash)"
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
            <div id="settings">
              <ToggleButton
                isDark={this.state.isDark}
                handleState={this.state.isDark}
                handleOnClick={this.handleToggleDarkMode}
                text={"Dark Mode"}
              />
              <ToggleButton
                isDark={this.state.include}
                handleState={this.state.includeParentheses}
                handleOnClick={this.handleToggleIncludeParentheses}
                text={"Remove"}
                subline={"( text )"}
              />
              <ChangelogButton
                handleChangelogView={this.handleChangelogView}
                isDark={this.state.isDark}
                currentVersion={this.state.currentVersion}
              />
            </div>
          </div>
          <div id="main">
            <div id="editor">
              <textarea
                id="input"
                value={this.state.input}
                className={`split-view ${this.state.isDark ? "dark" : ""}`}
                placeholder={this.state.placeholder}
                ref={ref => (this.input = ref)}
                onChange={event => {
                  this.handleChange(event.target.value, "input");
                }}
              />
            </div>
            <div id="preview">
              <textarea
                id="output"
                value={this.state.output}
                className={`split-view ${
                  this.state.isDark ? "dark" : ""
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
                style={theme}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
