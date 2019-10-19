import React from "react";
import CircularProgressBar from "./CircularProgressBar";
import Title from "./Title";
import ConfirmButton from "./ConfirmButton";
import ToggleButton from "./ToggleButton";
import Wrapper from "./Wrapper";

export default class ReferenceStripper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      input: "",
      output: "",
      copied: false,
      isDark: false
    };
  }

  componentDidMount() {
    const sample =
      "Lorem ipsum sit amet[1], consectetur elit[citation needed], sed do tempor ut labore (https://en.wikipedia.org/wiki/Lorem_ipsum)[2], dolore (https://en.wikipedia.org/wiki/Lorem_ipsum) magna aliqua (https://en.wikipedia.org/wiki/Lorem_ipsum) ultrices sagittis orci.[3] Ut imperdiet iaculus rhoncus, placerat quam, ut vehicula pulvinar.[5]:35 Fusce vestibulum[10]:400,418[11][12][13][14], et ”mattis orci iaculis!”.[5]:35–36";
    this.setState(
      {
        title: "Reference Stripper"
      },
      () => {
        this.handleChange(sample, "input");
      }
    );
  }

  handleChange = (value, type) => {
    this.setState({ [type]: value, copied: false }, () => {
      if (type === "input") {
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
        // strips newline before counting
        .replace(/[\n]/g, " ")
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
      if (string[i] === "[" && !isQuoting) {
        isWriting = false;
        hasClosed = false;
        isReferencing = true;
      }
      // removes embedded (<url)
      if (
        string[i + 1] === "(" &&
        string[i + 2] === "h" &&
        string[i + 3] === "t" &&
        string[i + 4] === "t" &&
        string[i + 5] === "p"
      ) {
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
        (string[i] === " " ||
          string[i] === "," ||
          string[i] === "." ||
          string[i] === "!" ||
          string[i] === ";" ||
          string[i] === ":" ||
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

  handleCopy = event => {
    const textareaText = this.outputTextareaRef.current;
    textareaText.select();
    document.execCommand("copy");
    this.setState({ copied: true }, () => {
      this.handleFlicker();
    });
  };

  handleToggleDarkMode = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark
    }));
  };

  render() {
    const flickr =
      this.state.flicker && this.state.copied
        ? "flicker red"
        : this.state.copied
        ? "red"
        : "";

    const themeDark = {
      background: "var(--charcoal)",
      color: this.state.copied ? "" : "var(--ash)"
    };

    const theme = this.state.isDark ? themeDark : {};

    return (
      <Wrapper isDark={this.state.isDark} style={theme}>
        <div id="container">
          <div id="header">
            <Title
              text={this.state.title}
              style={{ ...theme, color: this.state.isDark ? "var(--ash)" : "" }}
            />
            <ToggleButton
              isDark={this.state.isDark}
              handleToggleDarkMode={this.handleToggleDarkMode}
              style={{ ...theme, color: this.state.isDark ? "var(--ash)" : "" }}
            />
          </div>
          <div id="main">
            <div id="editor">
              <textarea
                id="input"
                value={this.state.input}
                className={"split-view"}
                ref={ref => (this.input = ref)}
                onChange={event => {
                  this.handleChange(event.target.value, "input");
                }}
                style={{
                  ...theme,
                  color: this.state.isDark ? "var(--ash)" : ""
                }}
              />
            </div>
            <div id="preview">
              <textarea
                id="output"
                value={this.state.output}
                className={`split-view ${flickr}`}
                ref={this.outputTextareaRef}
                onFocus={this.handleCopy}
                style={theme}
                readOnly
              />
              <CircularProgressBar
                wordCount={this.handleWordCount(this.state.output)}
                size={25}
              />
              <ConfirmButton
                className={this.state.copied ? "red confirm" : "confirm"}
                text={this.state.output}
                label={this.state.copied ? "Copied!" : "Copy"}
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
