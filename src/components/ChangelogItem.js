import React from 'react';
import PropTypes from 'prop-types';

const ChangelogItem = ({ version, date, change }) => (
  <li className="changelog-li">
    <h2>
      <span>{`v${version}`}</span>
      {date}
    </h2>
    <p>{change}</p>
  </li>
);

ChangelogItem.propTypes = {
  version: PropTypes.string,
  date: PropTypes.string,
  change: PropTypes.string
};

export default ChangelogItem;
