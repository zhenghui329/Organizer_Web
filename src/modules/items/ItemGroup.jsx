import React, { useState, useEffect } from 'react';
import sort from '../../controller/sort';
import PageInfoText from '../../shared/PageInfoText';
import ItemThumbnail from './ItemThumbnail';

const ItemGroup = ({ userState, itemData, isDeleteMode, setIsDisabled, setPageView, setUpdateList, onError }) => {

  const [ items, setItems ] = useState(null);
  const [ sortby, setSortby ] = useState('updated');
  const [ isAscend, setIsAscend ] = useState(false); // default descending

  useEffect( () => {
    sort.sortBy({ array: itemData, sortby, ascend: isAscend });
    setItems([ ...itemData ]);
  },[sortby, isAscend, itemData]);

// if there is no item, disable the deleteItemsButton
  useEffect( () => {
    if(!items || !items.length ){
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  },[items, setIsDisabled]);

  let itemsDisplay;
  let pageInfo;
  if(items){
    itemsDisplay = items.map( (item) => {
          return (
            <ItemThumbnail 
              key={ item.itemId }
              userState={ userState }
              item={ item }
              isDeleteMode={ isDeleteMode} 
              setUpdateList={ setUpdateList }  
              setPageView={ setPageView }
              onError={ onError }/>
          );
    });
    if(!items.length){
      pageInfo = <PageInfoText>There are no items yet</PageInfoText>;
    }
  }

  return (
        <div className="item-group">
          {pageInfo}
          <ul className="items-display">
            { itemsDisplay }
          </ul>
        </div>
  );

};

export default ItemGroup;