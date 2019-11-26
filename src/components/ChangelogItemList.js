import React from "react";
import ChangelogItem from "./ChangelogItem";

export default ({ updates }) => (
  <div>
    <ul>
      <li>
        <h1>Changelog</h1>
      </li>
      {updates.map(update => {
        return (
          <ChangelogItem
            key={update.version}
            version={update.version}
            date={update.date}
            change={update.change}
          />
        );
      })}
    </ul>
  </div>
);
