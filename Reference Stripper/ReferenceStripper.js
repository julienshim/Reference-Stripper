class ReferenceStripper extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
    title: "Reference Stripper - Current Updating as of 5:07PM",
    input: "",
    output: "Click on this text to copy.",
    copied: false
   };
  }
 
  handleChange = (value, type) => {
   this.setState({ [type]: value }, () => {
    if (type === "input") { this.handleStrip(this.state.input);
    }
   });
  };
 
 handleClear = () => {
  this.setState({copied: false})
 }
 
  handleStrip = string => {
   let isWriting = true;
   let isQuoting = false;
   let hasClosed = true;
   let stripped = "";
   for (let i = 0; i < string.length; i++) {
    if (string[i] === "[" && !isQuoting) { isWriting = false; hasClosed = false}
    if (string[i] ==="\"") { isQuoting = !isQuoting; }
    if (string[i] === "]") { hasClosed = true }
    if (string[i] === " " && hasClosed ) { isWriting = true;}
    if (isWriting) { stripped += string[i] }
    console.log(isWriting)
   }
   this.handleChange(stripped, "output");
  };
 
   onCopy = () => {
     this.setState({copied: true});
   };
 
  render() {
   return (
    <div id="container">
     <div id="header">
      <h1>{this.state.title}</h1>
      <div id="count">
       {this.state.input.length + " → " + this.state.output.length}
      </div>
     </div>
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
      </div>
      <div id="preview">
       <CopyToClipboard onCopy={this.onCopy} text={this.state.output}>
        <textarea id="output" class={this.state.copied && 'red'} value={this.state.output} readonly />
      </CopyToClipboard>
      <div id="confirm">{this.state.copied ? "Copied!" : "Copy"}</div>
      </div>
      </div>
    </div>
   );
  }
 }
 
 ReactDOM.render(<ReferenceStripper />, document.getElementById("app"));
 