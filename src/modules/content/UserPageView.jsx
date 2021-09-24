import React, { useState, useEffect } from 'react';
import { fetchListsBy } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import Title from '../../shared/Title';
import ListView from '../lists/ListView';
import ListSortMenu from '../lists/ListSortMenu';

const UserPageView = ({ userState, pageView, setPageView, onLogout }) => {

  const [ error, setError ] = useState('');
  const [ isOwner, setIsOwner] = useState(false);
  const [ listData, setListData] = useState(null);
  const [ sortby, setSortby ] = useState('updated');
  const [ isAscend, setIsAscend ] = useState(false); 

  useEffect( () => {
    if(pageView.reqData){
      const pageUser = pageView.reqData.username;
      const query = `username=${pageUser}`; 
      setError('');
      fetchListsBy(query)
      .then( responseJson => {
        setListData(responseJson.data);
      })
      .catch( (err) => {
        setError(errorMessages[err.code || 'DEFAULT']);
        if(err.status === 401){
          onLogout();
        }
      });
    }
  }, [pageView]);

  useEffect(() => {
    if(pageView.reqData){
      setIsOwner(userState.username === pageView.reqData.username);
    }
  },[pageView, userState]);

  const setErrorMessage = (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
  };

  let listSortMenu;
  if(isOwner){
    listSortMenu = <ListSortMenu 
          setSortby={ setSortby }
          setIsAscend={ setIsAscend } 
        />;
  }

  let listView = (<ListView
          sortby={ sortby }
          isAscend={ isAscend }  
          listData={ listData } 
          setPageView={ setPageView } 
          onError={ setErrorMessage }
        />);

  let content;
  if(listData){
    content = <div>
        <Title className="view-title">{pageView.reqData.username}'s Collections</Title>
        {listSortMenu}
        {listView}
        </div>;
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
        {content}
      </div>
  );
  
};

export default UserPageView;