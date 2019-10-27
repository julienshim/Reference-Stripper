import React from "react";

export default ({ handleChangelogView, isViewingChangelog }) => {

  const updates = [
    { version: "1.2.4", date: "2019-10-27", change: "Added Changelog. Fixed text area spacing." },
    { version: "1.2.3", date: "2019-10-22", change: "Fixed toggle label margin spacing. Added \"Nothing to Copy!\" user feedback when input is blank. Fixed stripping out whitespaces and dashes prior to word count. Fixed issue of not maintaining whitespace types (e.g. newline, tab) during handleStrip." },
    { version: "1.2.2", date: "2019-10-21", change: "Added remove all parenthesis mode. Fixed user feedback in Dark Mode." },
    { version: "1.2.1", date: "2019-10-16", change: "Fixed text stripping algorithm to account for rare references (e.g. [5]:35, [5]:35–36, [10]:400,418[11][12][13][14])." },
    { version: "1.2.0", date: "2019-10-13", change: "Removed easy mode. Removed react-copy-to-clipboard third-party package. Added copy to clipboard function. Added dark mode." },
    { version: "1.1.1", date: "2019-10-11", change: "Fixed word count algorithm to account for new line." },
    { version: "1.1.0", date: "2019-10-11", change: "Changed CSS to SCSS. Added Easy Mode (single box editing) " },
    { version: "1.0.5", date: "2019-09-20", change: "Fixed spacing issues on plaintext url stripping." },
    { version: "1.0.4", date: "2019-09-16", change: "Fixed text stripping algorithm to strip out plain text converted hyperlink URLs." },
    { version: "1.0.3", date: "2019-09-15", change: "Removed character count. Changed word count from text to circular progress bar." },
    { version: "1.0.2", date: "2019-09-14", change: "Added word count." },
    { version: "1.0.1", date: "2019-09-13", change: "Added user feedback when copying." },
    { version: "1.0.0", date: "2019-09-12", change: "Created initial tool with React, SCSS" }
  ]

  return (
    <div id="changelog" className={isViewingChangelog ? "" : "hidden"} onClick={handleChangelogView}>
      <div>
        <ul>
          <li><h1>Changelog</h1></li>
          {
            updates.map(update => {
              return <li className="changelog-li" key={update.version}><h2><span>{`v${update.version}`}</span>{update.date}</h2><p>{update.change}</p></li>
            })
          }
        </ul>
      </div>
    </div>
  )
};
