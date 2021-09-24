import React from 'react';

const ModalDialog = ({ show, setShowDialog, children }) => {

  const quitDialog = () => {
    setShowDialog(false);
  }

  return (
      <div className={"modal " + (show? "" : "hidden")}>
        <div className="modal-content">
          <i className="material-icons quit-icon" onClick={ quitDialog }>clear</i>
          {children}
        </div>
      </div>
  );

};

export default ModalDialog;