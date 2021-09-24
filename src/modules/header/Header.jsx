import React from 'react';
import PageTitle from './PageTitle';
import TopMenu from './TopMenu';

const Header = ({ userState, onLogout, setPageView, setLoginDialog }) => {
	return(
		<div className="header">
			<PageTitle 
				mainTitle="Our Collections" 
				subTitle="organize, track and share your collection" 
				setPageView = { setPageView } />
			<TopMenu 
				userState={ userState } 
				onLogout={ onLogout }
				setPageView={ setPageView } 
				setLoginDialog={ setLoginDialog }
				/>
		</div>
	);
};

export default Header;