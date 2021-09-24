import React, { useState, useEffect } from 'react';
import { fetchSingleCategory, updateSingleList } from '../../controller/services';
import pageType from '../../controller/page-types';
import Title from '../../shared/Title';
import CreateButtonDialog from '../../shared/CreateButtonDialog';
import CategorySelectMenu from '../to-add/CategorySelectMenu';

const ListInfo = ({ userState, isOwner, list, isEditMode, setIsEditMode, setPageView, setUpdateList, onError }) => {

  const oldCatId = list.categoryId;
  const [ listName, setListName ] = useState(list.listName);
  const [ categoryId, setCategoryId ] = useState(list.categoryId);
  const [ categoryName, setCategoryName ] = useState('');
  const [ description, setDescription ] = useState(list.description);

  useEffect( () => {
    fetchSingleCategory({ username:list.username, categoryId: list.categoryId })
    .then( responseJson => {
      setCategoryName(responseJson.data.categoryName);
    })
    .catch( (err) => {
      console.log("set error for listInfo");
      onError(err);
    });
  }, [list, onError]);

  const goToCategory = () => {
    const reqData = { username:list.username, categoryId: list.categoryId, categoryName: categoryName };
    setPageView({ reqData, view:pageType.SINGLE_CAT });
  };

  const goToUser = () => {
    const reqData = { username: list.username };
    setPageView({ reqData, view:pageType.USER_VIEW });
  }

  const replaceList = () => {
    if(!listName || !listName.trim()){
      onError({ code:"INPUT_REQUIRED" });
      return;
    }
    const username = userState.username;
    const newList = {
      ...list,
      listName, 
      description, 
      categoryId,
    };

    updateSingleList({ username, oldCatId, listId:list.listId, list:newList })
    .then( () => {
      // update this page view
      setIsEditMode(false);
      setUpdateList();
    })
    .catch( (err) => {
      console.log("set error in replacelist");
      onError(err);
    });
  };

  const cancelEdit = () => {
    onError({ code: "CLEAR" });
    setIsEditMode(false);
  }

  const listInfoPanel = (<div>
    <Title className="view-title list-detail-title">{list.listName}</Title>
    <div className="list-info-text-inline">category:<span className="list-info-goto link" onClick={ goToCategory }>{categoryName}</span></div>
    <div className="list-info-text-inline">from:<span className="list-info-goto link" onClick={ goToUser }>{list.username}</span></div>      
    <div className="list-description">{list.description}</div>
  </div>);

  const editListPanel = (<div>
    <input value={ listName } className="list-detail-title" onChange={ (e) => setListName(e.target.value) }/>
    <CategorySelectMenu
      username={ userState.username }
      categoryId={ categoryId }
      setCategoryId={ setCategoryId }
      onError={ onError }
    />
    <textarea className="list-description-textarea"
      value={description} 
      onChange={ (e) => setDescription(e.target.value) } />
    <CreateButtonDialog text="submit" onClick={ replaceList }/>
    <CreateButtonDialog text="cancel" onClick={ cancelEdit } />
  </div>);

  return (
      <div className="list-info">
        { isEditMode ? 
          editListPanel :
          listInfoPanel
        }
      </div>
  );

};

export default ListInfo;