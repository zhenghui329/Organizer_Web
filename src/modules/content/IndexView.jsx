import React, { useState, useEffect } from 'react';
import { fetchAllLists } from '../../controller/services';
import errorMessages from '../../controller/error-messages';
import SearchBar from '../../shared/SearchBar';
import ListView from '../lists/ListView';

const IndexView = ({ setPageView }) => {

  const [ error, setError ] = useState('');
  const [ listData, setListData] = useState(null);
  const [ keywords, setKeywords] = useState('');

  useEffect( () => {
    setError('');
    fetchAllLists()
    .then( responseJson => {
      setListData(responseJson.data);
    })
    .catch( (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
    });
  }, []);

  const setErrorMessage = (err) => {
      setError(errorMessages[err.code || 'DEFAULT']);
  };

  let listView;
  if(listData) {
    listView = (<ListView 
          sortby={ 'updated' }
          isAscend={ false }
          listData={ listData } 
          filter={ keywords } 
          setPageView={ setPageView }
          onError={ setErrorMessage } 
          />
        );
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
        <SearchBar setKeywords={ setKeywords }/>
        {listView}
      </div>
  );

};

export default IndexView;
