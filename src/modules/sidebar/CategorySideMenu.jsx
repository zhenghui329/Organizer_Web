import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../controller/services';
import pageType from '../../controller/page-types';
import sort from '../../controller/sort';
import Title from '../../shared/Title';
import PageInfoText from '../../shared/PageInfoText';

const CategorySideMenu = ({ userState, pageView, setPageView }) => {

  const [ categories, setCategories ] = useState(null);
  const [ isOwner, setIsOwner] = useState(false);

  useEffect( () => {
    if(pageView.reqData){
      const pageUser = pageView.reqData.username;
      setIsOwner(userState.username === pageUser);
      fetchCategories(pageUser)
      .then( responseJson => {
          setCategories(sort.sortBy({ array:responseJson.data, sortby:'categoryName', ascend:true }));
      })
      .catch( (err) => {
         // the error will be catched at the same time render the main content
      });
    }
  }, [pageView, userState]);

  const goToCategory = ({ username, categoryId, categoryName }) => {
    const reqData = { username, categoryId, categoryName };
    setPageView({ reqData, view:pageType.SINGLE_CAT });
  };

  const goToEditCategory = () => {
    const reqData = { username: userState.username };
    setPageView({ reqData, view:pageType.EDIT_CAT });
  };

  let categoryList;
  if(categories){
    categoryList = categories.map( ({ username, categoryId, categoryName, listCount }) => {
      return ( 
        <li 
          key={categoryId} 
          className="link" 
          onClick={ () => goToCategory({ username, categoryId, categoryName }) }>
          {categoryName}({listCount})
        </li>
      );
    });
  }

  let showEdit;
  if(isOwner){
    showEdit = <li className="edit-cat link" onClick={ goToEditCategory }>Edit Category</li>
  }

  let content;
  if(categories){
    content = (<div className="sidemenu-block">
            <Title className="sidemenu-title">{pageView.reqData.username}'s Categories</Title>
            <ul className="side-menu-list">{categoryList}{showEdit}</ul> 
          </div>);
  }

  return (
    <div>
      <div className="sidebar-module">
        {content}
      </div>
    </div>
  );
};

export default CategorySideMenu;