import React, { useState, useEffect } from 'react';
import sort from '../../controller/sort';
import PageInfoText from '../../shared/PageInfoText';
import ListTile from './ListTile';

const ListView = ({ sortby, isAscend, filter, listData, setPageView, onError }) => {

  const [ displayLists, setDisplayLists ] = useState(null);

  useEffect( () => {
    if(listData) {
      let lists = listData;
      if(filter){
        lists = listData.filter( list => list.listName.toLowerCase().includes(filter.toLowerCase()) );
      }
      if(sortby){
        sort.sortBy({ array: lists, sortby, ascend:isAscend });
        // copy the array to trigger react re-render
        lists = [...lists];
      }
      setDisplayLists(lists); 
    }
  }, [listData, filter, sortby, isAscend]);  

  let listsContent;
  if(displayLists){
    listsContent = displayLists.map( (list) => {
      return <ListTile 
      key={list.listId} 
      list={ list } 
      setPageView={ setPageView }
      onError={ onError }
      />
    });
  }

  let notFound;
  if(filter && !displayLists.length){
    notFound = <PageInfoText>no results found. 
    Take another pass with a different search term</PageInfoText>;
  }  

  return (
      <div className="lists-display">
        <ul> {listsContent} </ul>
        {notFound}
      </div>
  );

};

export default ListView;
