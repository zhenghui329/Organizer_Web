import React, { useState,useEffect } from 'react';
import { fetchLoginStatus, addItem } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import ErrorBox from '../../shared/ErrorBox';
import pageType from '../../controller/page-types';
import CreateButtonDialog from '../../shared/CreateButtonDialog';
import MandatoryIcon from '../../shared/MandatoryIcon';
import placeholder from '../../assets/placeholder.jpg';
import CatListSelectGroup from './CatListSelectGroup';

const NewItemForm = ({ userState, pageView, setPageView }) => {

  const [ error, setError ] = useState('');
  const [ itemName, setItemName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ categoryId, setCategoryId ] = useState(null);
  const [ listId, setListId ] = useState(null);
  const [ preview, setPreview ] = useState(placeholder);

  useEffect( () => {
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
    // if the category has been passed
    if(pageView.reqData){
      setListId(pageView.reqData.listId);
      setCategoryId(pageView.reqData.categoryId);
    }
  },[pageView, userState]);

  const setErrorMessage = (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
  };

  const addNewItem = () => {
    if(!itemName || !itemName.trim()) {
      setError(errorMessages.INPUT_REQUIRED);
      return;
    }
    const item = {
      itemName,
      description,
      listId,
      img:preview,
    };
    console.log(listId);
    setError('');
    addItem({ username: userState.username, listId, item })
    .then( (responseJson) => {
      // go to item detail page after posting
      const reqData = { listId, itemId: responseJson.data.itemId };
      setPageView({ reqData, view:pageType.SINGLE_ITEM });
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  };

  const convertImage = (e) => {
    const reader = new FileReader();
    reader.onload = function() {
      setPreview(reader.result);
      console.log("preview: " + preview);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const title = <div className="view-title">Create New Item</div>;
  const uploadImg = (<div className="uploadImg-group">
            <img className="img-preview" alt="preview" src={ preview } />
            <div className="preview-text">preview</div>
            <input type="file" text="upload Image" className="upload-input" onChange={ convertImage }/>
        </div>);

  const inputArea = (<div>
              <MandatoryIcon /><label>item name: </label>
              <input className="item-name-input" value={itemName} onChange={ (e) => setItemName(e.target.value) } />
              <CatListSelectGroup 
                userState={ userState }
                categoryId={ categoryId }
                listId={ listId }
                setCategoryId={ setCategoryId }
                setListId={ setListId }
                onError={ setErrorMessage } 
              />
              <label className="form-label">description: </label>
              <textarea rows="5" cols="30" value={description} onChange={ (e) => setDescription(e.target.value) } />
        </div>);

  const addButton = <CreateButtonDialog text="add" onClick={ addNewItem } />;

  let errorBox;
  errorBox = (<div>
            <div className={ (error? "" : "hidden") + " error-box"}>
                <div className="error-title">Sorry!</div>
                {error}
            </div>
        </div>);  

  return (
      <div className="add-item-form">
        {errorBox}
        <div className="title-area">{title}</div>
        <div className="add-all">
          <div className="add-left">
            {uploadImg}
          </div>
          <div className="add-right">
            {inputArea}
          </div>
        </div>
        <div className="post-item-button">
          {addButton}
        </div>
      </div>
  );

};

export default NewItemForm;
