import React from "react";

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      flicker: false
    };
  }

  // handleFlicker = () => {
  //   this.setState({ flicker: true });
  //   const timer = setTimeout(() => {
  //     this.setState({ flicker: false });
  //   }, 75);
  //   return () => clearTimeout(timer);
  // };

  handleTagCopy = (value, index) => {
    // console.log(
    //   "tag",
    const your = document.getElementById(`${value}-${index}`).getAttribute("data-value")
    // );
    // this.setState({ copied: true }, () => {
    //   console.log("tag is copied", this.state.copied)
    // });
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = your;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  
  };

  render() {
    const flickr =
      this.state.flicker && this.state.copied
        ? "flicker red"
        : this.state.copied
        ? "red"
        : "";

    const copiedStyle = this.state.copied
      ? { background: "var(--peach)", border: "1px solid var(--peach)" }
      : {};

    const { value, index, handleRemoveTag } = this.props;
    return (
      <div className="tag-container">
        <div className="tag">
          <div
            id={`${value}-${index}`}
            className="tag-label"
            data-value={value}
            onClick={() => this.handleTagCopy(value, index)}
          >
            {value.length <= 30 ? value : `${value.slice(0, 30).trim()}...`}
          </div>
          <div className="delete-tag" onClick={handleRemoveTag}>
            {"x"}
          </div>
        </div>
      </div>
    );
  }
}
