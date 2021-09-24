import React, { useState, useEffect } from 'react';
import { fetchListsBy } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import ListView from '../lists/ListView';
import Title from '../../shared/Title';

const CategoryView = ({ userState, pageView, setPageView, onLogout }) => {

  const [ error, setError ] = useState('');
  const [ listData, setListData] = useState(null);
  const collector = pageView.reqData.username;
  const categoryName = pageView.reqData.categoryName;

  useEffect( () => {
    const categoryId = pageView.reqData.categoryId;
    const query = `categoryId=${categoryId}`;
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
  }, [pageView]);

  const setErrorMessage = (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
  };

  let content;
  if(listData){
    content = (<div>
            <Title className="view-title">{collector}'s {categoryName} Collections</Title>
            <ListView 
              listData={ listData }
              setPageView={ setPageView } 
              onError={ setErrorMessage }
            />
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
        {content}
      </div>
  );

};

export default CategoryView;