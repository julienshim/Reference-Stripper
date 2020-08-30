import React from 'react';
import PropTypes from 'prop-types';

const SettingsPanel = ({
  handlePopUpView,
  isViewingPanel,
  panelRef,
  target,
  view,
  id,
  children,
}) => {
  const backButton = (
    <svg
      id="backButton"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z" />
    </svg>
  );
  return (
    <div id={id} ref={panelRef} className={isViewingPanel ? '' : 'hidden'}>
      <div id="panelContainer">
        <div
          id="closingDiv"
          role="button"
          onClick={() =>
            // eslint-disable-next-line prettier/prettier
      handlePopUpView(target, view)}
          onKeyUp={() =>
            // eslint-disable-next-line prettier/prettier
      handlePopUpView(target, view)}
          tabIndex={0}
        >
          {}
        </div>
        <div>
          <div
            id="backButtonContainer"
            role="button"
            onClick={() =>
              // eslint-disable-next-line prettier/prettier
      handlePopUpView(target, view)}
            onKeyUp={() =>
              // eslint-disable-next-line prettier/prettier
      handlePopUpView(target, view)}
            tabIndex={0}
          >
            {backButton}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

SettingsPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  target: PropTypes.string,
  view: PropTypes.string,
  handlePopUpView: PropTypes.func,
  isViewingPanel: PropTypes.bool,
  panelRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element),
    }),
  ]),
};

export default SettingsPanel;
