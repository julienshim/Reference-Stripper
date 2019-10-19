import React from 'react';

export default ({ children, style }) => {
  return (
    <div id="wrapper" style={style}>
      {children}
    </div>
  );
};
