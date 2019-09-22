// Reference Stripper

// Created by Julien Shim on 9/11/19.
// Copyright © 2019 Julien Shim. All rights reserved.

const ToggleButton = ({isEasy, handleSettingsMode}) => (
  // <div>
  //  <button onClick={handleSettingsMode}>{isEasy ? "Easy" : "Advanced"}</button>
  // </div>
  <div id="toggle">
  <label class="switch">
   <input checked={isEasy} onClick={handleSettingsMode} type="checkbox" />
   <span class="slider"></span>
  </label>
   <p id="toggleLabel">{isEasy ? "Easy Mode" : "Split Mode"}</p>
  </div>
 )
 
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
 
 const Title = ({ title }) => <h1>{title}</h1>;
 
 const Count = ({ length, wordCount }) => (
   <div id="count">{length + " characters / " + wordCount + " words"}</div>
 );
 
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
       isEasy: false
     };
   }
 
   handleChange = (value, type) => {
     this.setState({ [type]: value, copied: false }, () => {
       if (type === "input") {       this.handleChange(this.handleStrip(this.state.input), "output");
       }
     });
   };
 
  handleSettingsMode = () => {
   this.setState(prevState => ({
    isEasy: !prevState.isEasy
   }))
  }
 
   handleFlicker = () => {
     this.setState({ flicker: true });
     const timer = setTimeout(() => {
       this.setState({ flicker: false });
     }, 75);
 
     return () => clearTimeout(timer);
   };
 
   handleWordCount = string => {
     return string.split(" ").filter(function(n) {
       return n != "";
     }).length;
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
       // this saves the trouble of removing addresses when copying hyperlinked text
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
     }
     // this.handleChange(stripped, "output");
    return stripped;
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
         <div id="header">
         <Title title={this.state.title} />
         <ToggleButton isEasy={this.state.isEasy} handleSettingsMode={this.handleSettingsMode}/>
       </div>
         <div id="main">
           <div id="editor">
             <textarea
               id="input"
               value={this.state.isEasy ? this.state.output : this.state.input}
               placeholder="Paste original Wikipedia line or paragraph text here."
               class={this.state.isEasy && flickr}
               onChange={event => {
  this.handleChange(event.target.value, "input");
               }}
             />
             <CircularProgressBar
               wordCount={this.handleWordCount(this.state.isEasy ? this.state.output : this.state.input)}
               size={25}
             />
             {/* <Count length={this.state.input.length} wordCount={this.handleWordCount(this.state.input)} /> */}
                                          <CopyToClipboard onCopy={this.onCopy} text={this.state.output}>
                   <ConfirmButton
                  onClick={this.handleFlicker}
                 className={this.state.copied ? "red confirm" : "confirm"}
                 text={this.state.copied ? "Copied!" : "Copy"}
               />
                       </CopyToClipboard>
                       </div>

           <CopyToClipboard className={this.state.isEasy && "hidden"} onCopy={this.onCopy} text={this.state.output}>
             <div id="preview" onClick={this.handleFlicker}>
               <textarea
                 id="output"
                 value={this.state.output}
                 class={flickr}
                 readonly
               />
               <CircularProgressBar
                 wordCount={this.handleWordCount(this.state.output)}
                 size={25}
               />
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
 