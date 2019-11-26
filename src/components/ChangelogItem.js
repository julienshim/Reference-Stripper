import React from "react";

export default ({version, date, change}) => (
  <li className="changelog-li">
    <h2>
      <span>{`v${version}`}</span>
      {date}
    </h2>
    <p>{change}</p>
  </li>
);
