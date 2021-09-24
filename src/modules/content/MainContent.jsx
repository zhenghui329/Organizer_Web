import React,{ useEffect } from 'react';
import pageType from '../../controller/page-types';
import PageInfoText from '../../shared/PageInfoText';
import IndexView from './IndexView';
import UserPageView from './UserPageView';
import CategoryView from './CategoryView';
import ListDetailView from './ListDetailView';
import ItemDetailView from './ItemDetailView';
import NewItemForm from '../to-add/NewItemForm';

const MainContent = ({ userState, pageView, setPageView, onLogout }) => {

  let content;
  switch(pageView.view) {
    case pageType.INDEX :
      content = <IndexView setPageView={ setPageView } />;
      break;
    case pageType.SINGLE_CAT:
      content = <CategoryView
        pageView={ pageView }
        setPageView={ setPageView } 
        onLogout={ onLogout }/>
      break;
    case pageType.USER_SELF:
      content = <UserPageView 
        userState={ userState } 
        pageView={ pageView } 
        setPageView={ setPageView } 
        onLogout={ onLogout } />;
      break;
    case pageType.USER_VIEW:
      content = <UserPageView 
        userState={ userState } 
        pageView={ pageView } 
        setPageView={ setPageView } 
        onLogout={ onLogout } />;
      break;
    case pageType.SINGLE_LIST:
      content = <ListDetailView 
        userState={ userState } 
        pageView={ pageView }
        setPageView={ setPageView } />;
      break;
    case pageType.SINGLE_ITEM:
      content = <ItemDetailView 
        userState={ userState } 
        pageView={ pageView }
        setPageView={ setPageView } 
        onLogout={ onLogout }/>;
      break;
    case pageType.POST_ITEM:
      content = <NewItemForm 
        userState={ userState } 
        pageView={ pageView }
        setPageView={ setPageView } />;
      break;
    case pageType.EDIT_CAT:
    case pageType.EDIT_ITEM:
      content = <PageInfoText>Coming soon...</PageInfoText>;
      break;
    default: // default shows nothing
      content = '';
  }

  return (
      <div>
        {content}
      </div>
  );

};

export default MainContent;