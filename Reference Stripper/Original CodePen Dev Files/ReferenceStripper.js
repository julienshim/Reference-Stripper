// Reference Stripper

// Created by Julien Shim on 9/11/19.
// Copyright © 2019 Julien Shim. All rights reserved.

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
        ? "var(--ash)"
        : wordCount < 40
        ? "var(--peach)"
        : "transparent"
  };
  const progressStyle = {
    strokeDashoffset,
    stroke:
      wordCount < 20
        ? "var(--blue)"
        : wordCount < 30
        ? "var(--tangerine)"
        : wordCount < 40
        ? "var(--peach)"
        : "transparent"
  };
  const textStyle = { fill: wordCount < 30 ? "var(--ash)" : "var(--peach)" };
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

const Title = ({ text, style }) => <h1 style={style}>{text}</h1>;

const ToggleButton = ({ isDark, handleToggleDarkMode, style }) => (
  <div id="toggle">
    <label className="switch">
      <input
        defaultChecked={isDark}
        type="checkbox"
        onClick={handleToggleDarkMode}
      />
      <span className="slider"></span>
    </label>
    <p id="toggleLabel" style={style}>
      {"Dark Mode"}
    </p>
  </div>
);

const Wrapper = ({ children, style }) => {
  return (
    <div id="wrapper" style={style}>
      {children}
    </div>
  );
};

class ReferenceStripper extends React.Component {
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

ReactDOM.render(<ReferenceStripper />, document.getElementById("app"));
