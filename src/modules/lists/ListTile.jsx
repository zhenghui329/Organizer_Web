import React, { useState, useEffect } from 'react';
import { fetchSingleCategory } from '../../controller/services';
import pageType from '../../controller/page-types';
import sort from '../../controller/sort';

// list info with 5 item-thumbnails
const ListTile = ({ list, setPageView, onError }) => {

  const [ categoryName, setCategoryName ] = useState('');

  useEffect( () => {
    fetchSingleCategory({ username: list.username, categoryId: list.categoryId })
    .then( responseJson => {
          setCategoryName(responseJson.data.categoryName);
        })
    .catch( (err) => {
      onError(err);
    });
  });

  const goToCategory = () => {
    const reqData = { username:list.username, categoryId: list.categoryId, categoryName };
    setPageView({ reqData, view:pageType.SINGLE_CAT });
  };

  const goToList = () => {
    const reqData = { username:list.username, listId:list.listId };
    setPageView({ reqData, view:pageType.SINGLE_LIST });
  }

  const goToUser = () => {
    const reqData = { username: list.username };
    setPageView({ reqData, view:pageType.USER_VIEW });
  }

  const goToItem = (itemId) => {
    const reqData = { listId:list.listId, itemId };
    setPageView({ reqData, view:pageType.SINGLE_ITEM });
  };

  let thumbnails;
  if(list){
    const items = Object.values(list.items);
    if(items.length){
      sort.sortBy({ array: items, sortby:'updated', ascend: false });
      const topItems = items.slice(0,6);
      thumbnails = topItems.map( item => {
        return (
          <li key={item.itemId}>
            <img 
              className="listview-thumbnail" 
              alt={ item.itemName } 
              src={ item.img }
              onClick={ () => goToItem(item.itemId) } 
            />
          </li> );
      });
    }
  }

  const date = new Date(list.updated);
  const lastUpdated = date.toLocaleString('en-US');

  const listCard = (
        <div>
          <div className="list-title link" onClick={ goToList }>{list.listName}</div>
          <div className="list-info-text-inline">category:<span className="list-info-goto link" onClick={ goToCategory }>{categoryName}</span></div>
          <div className="list-info-text-inline">from:<span className="list-info-goto link" onClick={ goToUser }>{list.username}</span></div>
          <ul className="listview-img-group">
            {thumbnails}
          </ul>
          <div className="list-info-text">Total item: <span className="item-count-info">{list.itemCount}</span></div>
          <div className="list-info-text">Last updated: {lastUpdated}</div>
       </div>
  );

  return (
        <li className="list-tile">{ listCard }</li>
  );

};

export default ListTile;