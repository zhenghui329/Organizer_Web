import React, { useState, useEffect } from 'react';
import { fetchSingleItem,fetchSingleList } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import pageType from '../../controller/page-types';
import EditButton from '../../shared/EditButton';
import placeholder from '../../assets/placeholder.jpg';

const ItemDetailView = ({ userState, pageView, setPageView, onLogout }) => {

  const [ error, setError ] = useState('');
  const [ item, setItem ] = useState(null);
  const [ listName, setListName ] = useState('');
  const [ itemOwner, setItemOwner ] = useState('');
  const [ isOwner, setIsOwner] = useState(false);

  useEffect( () => {
    const listId = pageView.reqData.listId;
    const itemId = pageView.reqData.itemId;
    setError('');
    fetchSingleItem({ listId, itemId })
    .then( responseJson => {
      setItem(responseJson.data);
      fetchListName(listId);
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
      if(err.status === 401){
        onLogout();
      }
    });
  },[pageView]);

  useEffect( () => {
    if(itemOwner){
      setIsOwner(userState.username === itemOwner);
    }
  },[itemOwner]);

  const fetchListName = (listId) => {
    return fetchSingleList(listId)
      .then( responseJson => {
            setListName(responseJson.data.listName);
            setItemOwner(responseJson.data.username);
      })
      .catch( (err) => {
        setError(errorMessages[err.code || 'DEFAULT']);
      });
  };

  const goToList = () => {
    const reqData = { username:itemOwner, listId:item.listId };
    setPageView({ reqData, view:pageType.SINGLE_LIST });
  };

  const goToUser = () => {
    const reqData = { username: itemOwner };
    setPageView({ reqData, view:pageType.USER_VIEW });
  };

  const goToEditItem = () => {
    setPageView({ reqData:null, view:pageType.EDIT_ITEM });
  };


  let itemDetail;
  if(item){
    itemDetail = (
      <div>
        {item.img ?
          <img className="item-img" alt={item.itemName} src={ item.img }/> : 
          <img className="item-img" alt="placeholder" src={ placeholder }/>
         }
        <div className="item-title">{item.itemName}</div>
        <div className="item-info-text link" onClick={ goToList }>{listName}</div>
        <div className="item-info-text link" onClick={ goToUser }>from: {itemOwner}</div>
        <div className="item-description">{item.description}</div>
      </div>
      );
  }

  let editButton;
  if(isOwner){
    editButton = (<div className="item-edit-button">
            <EditButton text="Edit" onClick={ goToEditItem }/>
          </div>);
  }

  let errorBox;
  errorBox = (<div>
            <div className={ (error? "" : "hidden") + " error-box"}>
                <div className="error-title">Sorry!</div>
                {error}
            </div>
        </div>);  

  return (
        <div>
         {errorBox}
          <div>{ itemDetail }</div>
          { editButton }
        </div>
  );

};

export default ItemDetailView;