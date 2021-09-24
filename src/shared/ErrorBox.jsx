import React, { useState } from 'react';

const ErrorBox = ({children}) => {

  return (
      <div className="error-box">
        {children}
      </div>
  );

};

export default ErrorBox;