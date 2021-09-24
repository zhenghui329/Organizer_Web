import React, { useState,useEffect } from 'react';
import { fetchListsBy } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import MandatoryIcon from '../../shared/MandatoryIcon';
import CategorySelectMenu from './CategorySelectMenu';
import ListSelectMenu from './ListSelectMenu';


const CatListSelectGroup = ({ userState, categoryId, listId, setCategoryId, setListId, onError }) => {

  const [ listError, setListError ] = useState('');
  const [ lists, setLists ] = useState(null);

  const setErrorMessage = (err) => {
    setListError(errorMessages[err.code || 'DEFAULT']);
  }

  // render list select menu only after categoryId is set
  useEffect( () => {
    if(categoryId){
        const query = `categoryId=${categoryId}`;
        fetchListsBy(query)
        .then( responseJson => {
            setLists(responseJson.data);
        })
        .catch( (err) => {
          onError(err);
        });
    }
  },[categoryId, onError]);

  let listSelectMenu; 
  if(lists){
    listSelectMenu = (<ListSelectMenu 
                lists={ lists }
                listId={ listId }
                setListId={ setListId }
                onError={ setErrorMessage } 
            />);

  } else{
    listSelectMenu = <p>loading list...</p>
  }

  return (
      <div className="cat-list-menu">
           <label className="form-label"><MandatoryIcon />category: </label>
          <CategorySelectMenu 
            username={ userState.username }
            categoryId={ categoryId }
            setCategoryId={ setCategoryId }
            onError={ onError }
          />
           <label className="form-label"><MandatoryIcon />list: </label>
           {listSelectMenu}
           {listError}
      </div>
  );

};

export default CatListSelectGroup;
