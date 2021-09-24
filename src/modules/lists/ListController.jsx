import React, { useState, useEffect } from 'react';
import { deleteSingleList } from '../../controller/services';
import pageType from '../../controller/page-types';
import EditButton from '../../shared/EditButton';
import CreateButtonMain from '../../shared/CreateButtonMain';

const ListController = ({ userState, list, isDisabled, isDeleteMode, setIsEditMode, setIsDeleteMode, setPageView, onError }) => {

  const [ buttonText, setButtonText ] = useState('Delete Items');

  useEffect( () => {
    if(isDisabled){
      setButtonText('Delete Items')
    } else{
        if(isDeleteMode){
          setButtonText('Cancel');
        } else {
          setButtonText('Delete Items');
        } 
    }
  },[isDeleteMode, isDisabled]);

  const toggleDelete = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const deleteList = () => {
    deleteSingleList({ username: userState.username, listId:list.listId })
    .then( () => {
      goToMyPage();
    })
    .catch( (err) => {
      onError(err);
      goToMyPage();
    });
  }

  // after delete the list
  const goToMyPage = () => {
    const reqData= { username: userState.username };
    setPageView({ reqData, view:pageType.USER_SELF });
  };

  const goToPost = () => {
    const reqData = { listId: list.listId, categoryId: list.categoryId };
    setPageView({ reqData, view:pageType.POST_ITEM });
  };

  const editButton = <EditButton text="Edit list" onClick={ () => setIsEditMode(true) }/>
  const addButton = <CreateButtonMain text="Add new item" onClick={ goToPost } />;
  const deleteListButton = <button className="list-delete-button" onClick={ deleteList }>
    <i className="material-icons delete-button-icon">delete</i>
    Delete List</button>;
  const deleteItemsButton = <button className="list-delete-button" onClick={ toggleDelete } disabled={isDisabled}>
     <i className="material-icons delete-button-icon">delete</i>
    {buttonText}</button>;

  return (
      <div className="list-menu">
        <div className="list-menu-module">
          {editButton}
          {addButton}
        </div>
        <div className="list-menu-module">
          {deleteListButton}
          {deleteItemsButton}
        </div>
      </div>
  );

};

export default ListController;