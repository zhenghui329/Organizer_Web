import React from 'react';
import pageType from '../../controller/page-types';
import PageInfoText from '../../shared/PageInfoText'
import HomePageButton from '../../shared/HomePageButton';
import LoginForm from '../login/LoginForm';
import UserSideMenu from './UserSideMenu';
import CategorySideMenu from './CategorySideMenu';


const SideBar = ({ userState, onLogin, pageView, setPageView, onLogout }) => {
	
	let userPanel;
	//if not loggedIn, show log in form
	if(userState){
		if(!userState.isLoggedIn){
			userPanel = <LoginForm 
				onLogin={ onLogin } 
				setPageView={ setPageView }/>;
		} else {
			userPanel = <UserSideMenu 
				userState={ userState }
				setPageView={ setPageView }
				onLogout={ onLogout }
				/>;
		}	
	} else{
		userPanel = <PageInfoText>loading...</PageInfoText>;
	}

	let categorySideMenu;
	if(pageView.view === pageType.USER_VIEW || pageView.view === pageType.USER_SELF){
		categorySideMenu = <CategorySideMenu 
				userState={ userState }
				pageView={ pageView }
				setPageView={ setPageView}
			/>;
	}

	let homeButton;
	if(pageView.view !== pageType.INDEX){
		homeButton = <div className="sidebar-module">
				<HomePageButton setPageView={ setPageView }>
				 Home
				 </HomePageButton>
			</div>
	}

	return(
		<div className="side-bar">
			{userPanel}
			{homeButton}
			{categorySideMenu}
		</div>
	);
};

export default SideBar;