import React, { useState, useEffect } from 'react';
import { fetchSingleList } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import ListInfo from '../lists/ListInfo';
import ListController from '../lists/ListController';
import ItemGroup from '../items/ItemGroup';

const ListDetailView = ({ userState, pageView, setPageView }) => {

  const [ error, setError ] = useState('');
  const [ list, setList] = useState(null);
  const [ isOwner, setIsOwner] = useState(false);
  const [ updateList, setUpdateList ] = useState(false);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ isDeleteMode, setIsDeleteMode ] = useState(false);

  useEffect( () => {
    setIsOwner(userState.username === pageView.reqData.username);
    setError('');
    fetchSingleList(pageView.reqData.listId)
    .then( responseJson => {
      setList(responseJson.data);
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  }, [pageView, userState, updateList]);

  const toggleFlag = () => {
    setUpdateList(!updateList);
  }

  const setErrorMessage = (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
  };

  let listInfo;
  if(list){
    listInfo = (<ListInfo 
          userState={ userState }
          isOwner={ isOwner }
          list={ list }
          isEditMode={ isEditMode }
          setIsEditMode={ setIsEditMode }
          setUpdateList={ setUpdateList }
          setPageView= { setPageView } 
          onError={ setErrorMessage }
          />);
  }

  let itemGroup;
  if(list && list.items){
    const itemData = Object.values(list.items);
    itemGroup = (<ItemGroup 
          userState={ userState }
          isOwner={ isOwner }
          listId={ list.listId } 
          itemData={ itemData }
          isDeleteMode={ isDeleteMode }
          setIsDisabled={ setIsDisabled }
          setPageView= { setPageView }
          setUpdateList={ toggleFlag }
          onError={ setErrorMessage } 
        />);
  }

  let listController;
  if(isOwner){
     listController = (<ListController 
                userState={ userState }
                list={ list }
                isDisabled={ isDisabled }
                isDeleteMode={ isDeleteMode }
                setIsEditMode={ setIsEditMode }
                setIsDeleteMode={ setIsDeleteMode }
                setPageView= { setPageView }
                onError={ setErrorMessage }
              />);
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
        {listInfo}
        {listController}
        {itemGroup}
      </div>
  );

};

export default ListDetailView;