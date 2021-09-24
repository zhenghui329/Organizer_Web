import React from 'react';
import { fetchLogout } from '../../controller/services';
import pageType from '../../controller/page-types';
import LoginButton from '../../shared/LoginButton';
import MyPageButton from '../../shared/MyPageButton';
import PageInfoText from '../../shared/PageInfoText';

const TopMenu = ({ userState, onLogout, setPageView, setLoginDialog }) => {

	const performLogout = () => {
    	fetchLogout()
    	.then( () => {
    		onLogout();
    	})
    	.catch( (err) => {
            onLogout();
    	});
        setPageView({ reqData:null, view:pageType.INDEX });
    }

    let menu;
    if(userState){
        if(userState.isLoggedIn && userState.username){
        	menu = <div>
        		<span className="welcome-text">Welcome!</span><span className="topmenu-username">{userState.username}</span>
        		<MyPageButton 
                    userState={ userState } 
                    setPageView={ setPageView } 
                >My Page</MyPageButton>
        		<button onClick={ performLogout } className="log-out-button">Log out</button>
        	</div>
        } else {
        	menu = <div>
        		<LoginButton text="Log in" onClick={ () => setLoginDialog(true) } />
        	</div>
        }
    } else {
        menu = <PageInfoText>loading...</PageInfoText>;
    }

	return(
		<div className="top-menu">
			{menu}
		</div>
	);
};

export default TopMenu;