import React from 'react';
import { deleteItem } from '../../controller/services';
import pageType from '../../controller/page-types';
import placeholder from '../../assets/placeholder.jpg';

const ItemThumbnail = ({ userState, item, isDeleteMode, setUpdateList, setPageView, onError }) => {

  const listId = item.listId;
  const itemId = item.itemId;
  const img = item.img;
  const itemName = item.itemName;

  const removeItem = () => {
    deleteItem({ username: userState.username, listId, itemId })
    .then( () => {
      setUpdateList();
    })
    .catch( (err) => {
      onError(err);
    });
  }
  
  const goToItem = () => {
    const reqData = { listId, itemId };
    setPageView({ reqData, view:pageType.SINGLE_ITEM });
  };

let displayImg;
if(img){
  displayImg = (<img 
                    className="thumbnail" 
                    alt={itemName} 
                    src={ img }
                    onClick={ goToItem } 
                /> 
                );
} else {
  displayImg = <img className="thumbnail" alt="placeholder" src={ placeholder }/>;
}


const itemDisplay = 
    <li className="thumbnail-item">
      <div className="item-pic">
        { displayImg }
        <i className={ (isDeleteMode? "":"hidden") + " material-icons item-delete-icon" } 
        onClick={ removeItem }>clear</i>
      </div>
      <div className="thumbnail-item-title link" onClick={ goToItem } >
        {itemName}
      </div>
    </li>;

  return itemDisplay;

};

export default ItemThumbnail;