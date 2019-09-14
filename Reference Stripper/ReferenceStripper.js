const Title = ({ title }) => <h1>{title}</h1>;

const Count = ({ length }) => <div id="count">{length}</div>;

const ConfirmButton = ({ className, text }) => (
  <div id="confirm" className={className}>
    {text}
  </div>
);

class ReferenceStripper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reference Stripper",
      input: "",
      output: "Click on this text to copy.",
      copied: false,
      flicker: false
    };
  }

  handleChange = (value, type) => {
    this.setState({ [type]: value }, () => {
      if (type === "input") {
        this.handleStrip(this.state.input);
      }
    });
  };

  handleClear = () => {
    this.setState({ copied: false });
  };

  handleFlicker = () => {
    this.setState({ flicker: true });
    const timer = setTimeout(() => {
      this.setState({ flicker: false });
    }, 75);

    return () => clearTimeout(timer);
  };

  handleStrip = string => {
    let isWriting = true;
    let isQuoting = false;
    let hasClosed = true;
    let stripped = "";
    for (let i = 0; i < string.length; i++) {
      if (string[i] === "[" && !isQuoting) {
        isWriting = false;
        hasClosed = false;
      }
      if (string[i] === '"') {
        isQuoting = !isQuoting;
      }
      if (string[i] === "]") {
        hasClosed = true;
      }
      if (string[i] === " " && hasClosed) {
        isWriting = true;
      }
      if (isWriting) {
        stripped += string[i];
      }
      console.log(isWriting);
    }
    this.handleChange(stripped, "output");
  };

  onCopy = () => {
    this.setState({ copied: true });
  };

  render() {
    const flickr =
      this.state.flicker && this.state.copied
        ? "flicker red"
        : this.state.copied
        ? "red"
        : "";

    return (
      <div id="container">
        <Title title={this.state.title} />
        <div id="main">
          <div id="editor">
            <textarea
              id="input"
              value={this.state.input}
              placeholder="Paste original Wikipedia text here."
              onClick={this.handleClear}
              onChange={event => {
                this.handleChange(event.target.value, "input");
              }}
            />
            <Count length={this.state.input.length} />
          </div>
          <CopyToClipboard onCopy={this.onCopy} text={this.state.output}>
            <div id="preview" onClick={this.handleFlicker}>
              <textarea
                id="output"
                value={this.state.output}
                class={flickr}
                readonly
              />
              <Count length={this.state.output.length} />
              <ConfirmButton
                className={this.state.copied ? "red confirm" : "confirm"}
                text={this.state.copied ? "Copied!" : "Copy"}
              />
            </div>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ReferenceStripper />, document.getElementById("app"));
