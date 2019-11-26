import React from "react";
import ChangelogItemList from "./ChangelogItemList";

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
      <ChangelogItemList updates={updates} />
    </div>
  );
};
