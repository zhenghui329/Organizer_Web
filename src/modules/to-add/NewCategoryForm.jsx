import React, { useState, useEffect } from 'react';
import { fetchLoginStatus, addCategory } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import pageType from '../../controller/page-types';
import CreateButtonDialog from '../../shared/CreateButtonDialog';
import CancelButtonDialog from '../../shared/CancelButtonDialog';
import MandatoryIcon from '../../shared/MandatoryIcon';

const NewCategoryForm = ({ userState, setDialog, setPageView, updateMyPage, onLogout }) => {

  const [ error, setError ] = useState('');
  const [ categoryName, setCategoryName ] = useState('');

  useEffect( ()=>{
    setError('');
    fetchLoginStatus()
    .then( responseJson => {
      if(responseJson.data.username !== userState.username){
        setError(errorMessages.ACTION_NOT_PERMITTED);
      }
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  },[]);

  const addNewCategory = () => {
    if(!categoryName || !categoryName.trim()) {
      setError(errorMessages.INPUT_REQUIRED);
      return;
    }
    setError('');
    addCategory({ username: userState.username, category:{ categoryName:categoryName } })
    .then( () => {
      // go to user homepage
      const reqData = { username: userState.username };
      setPageView({ reqData, view:pageType.USER_SELF });
      setDialog(false); 
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  };

  const buttons = (<div className="dialog-buttons">
            <CreateButtonDialog text="create" onClick={ addNewCategory } />
            <CancelButtonDialog text="cancel" onClick={ () => setDialog(false) } />
          </div>);

  return (
      <div className="add-dialog-form">
        <div className="dialog-title">Create New Category</div>
        <p className="dialog-prompt">This is a group of your collection lists!</p>
        <p className="error">{ error }</p>
        <div>
          <MandatoryIcon /><label>category name: </label>
          <input value={categoryName} onChange={ (e) => setCategoryName(e.target.value) } />
          {buttons}
        </div>
      </div>
  );

};

export default NewCategoryForm;
