import React, { useState, useEffect } from 'react';
import { fetchLoginStatus, addList } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import pageType from '../../controller/page-types';
import CreateButtonDialog from '../../shared/CreateButtonDialog';
import CancelButtonDialog from '../../shared/CancelButtonDialog';
import MandatoryIcon from '../../shared/MandatoryIcon';
import CategorySelectMenu from './CategorySelectMenu';

const NewListForm = ({ userState, setDialog, setPageView, updateMyPage, onLogout }) => {

  const [ error, setError ] = useState('');
  const [ listName, setListName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ categoryId, setCategoryId ] = useState('');

  useEffect( ()=>{
    setError('');
    fetchLoginStatus()
    .then( responseJson => {
      console.log('login:'+ responseJson.data.username);
      console.log('userState:'+ userState.username);
      if(responseJson.data.username !== userState.username){
        setError(errorMessages.ACTION_NOT_PERMITTED);
      }
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  },[]);

  const addNewList = () => {
    if(!listName || !listName.trim()) {
      setError(errorMessages.INPUT_REQUIRED);
      return;
    }
    setError('');
    addList({ username: userState.username, list:{ listName, description, categoryId } })
    .then( () => {
      // go to user homepage
      const reqData = { username: userState.username };
      setPageView({ reqData, view:pageType.USER_SELF });
      // updateMyPage();
      setDialog(false); 
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  };

  const convertError = (err) => {
    setError(errorMessages[err.code || 'DEFAULT']);
  }

  const buttons = (<div className="dialog-buttons">
            <CreateButtonDialog text="create" onClick={ addNewList } />
            <CancelButtonDialog text="cancel" onClick={ () => setDialog(false) } />
          </div>);

  return (
      <div className="add-dialog-form">
        <div className="dialog-title">Create New List</div>
        <p className="dialog-prompt">This is a list of your collection items!</p>
        <p className="error">{error}</p>
        <div>
         <label className="form-label"><MandatoryIcon />list name: </label>
          <input className="new-list-input" onChange={ (e) => setListName(e.target.value) } />
          <label className="form-label">category: </label>
          <CategorySelectMenu 
            username={ userState.username }
            setCategoryId={ setCategoryId }
            onError={ convertError } 
          />
          <label className="form-label">description: </label>
          <textarea rows="3" cols="35" value={description} onChange={ (e) => setDescription(e.target.value) } />
          {buttons}
        </div>
      </div>
  );

};

export default NewListForm;
