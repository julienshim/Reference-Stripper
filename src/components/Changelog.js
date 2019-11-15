import React from "react";

export default ({
  handleChangelogView,
  isViewingChangelog,
  changelogRef,
  updates
}) => {
  return (
    <div
      id="changelog"
      className={isViewingChangelog ? "" : "hidden"}
      onClick={handleChangelogView}
      ref={changelogRef}
    >
      <div>
        <ul>
          <li>
            <h1>Changelog</h1>
          </li>
          {updates.map(update => {
            return (
              <li className="changelog-li" key={update.version}>
                <h2>
                  <span>{`v${update.version}`}</span>
                  {update.date}
                </h2>
                <p>{update.change}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
