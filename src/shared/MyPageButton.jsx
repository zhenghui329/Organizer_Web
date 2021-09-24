import React from 'react';
import pageType from '../controller/page-types';

const MyPageButton = ({ children, userState, setPageView }) => {

	const goToMyPage = () => {
		const reqData = { username: userState.username };
		setPageView({ reqData, view: pageType.USER_SELF });
	}

	return(
		<button className="my-page-button" onClick={ goToMyPage } >
			<i className="material-icons">person</i>{children}
		</button>
	);
};

export default MyPageButton;