import React from 'react';
import PropTypes from 'prop-types';
import ChangelogItemList from './ChangelogItemList';

const Changelog = ({
  handleChangelogView,
  isViewingChangelog,
  changelogRef,
  updates
}) => {
  return (
    <div
      id="changelog"
      className={isViewingChangelog ? '' : 'hidden'}
      onClick={handleChangelogView}
      onKeyUp={handleChangelogView}
      ref={changelogRef}
      role="button"
      tabIndex={0}
    >
      <ChangelogItemList updates={updates} />
    </div>
  );
};

Changelog.propTypes = {
  handleChangelogView: PropTypes.func,
  isViewingChangelog: PropTypes.bool,
  changelogRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any
    })
  ]),
  updates: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        version: PropTypes.string,
        date: PropTypes.string,
        change: PropTypes.string
      })
    ])
  )
};

export default Changelog;
