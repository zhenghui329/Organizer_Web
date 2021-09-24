import React from 'react';
import pageType from '../controller/page-types';

const HomePageButton = ({ children, setPageView }) => {

	const goHome = () => {
		setPageView({ reqData:null, view: pageType.INDEX });
	}

	return(
		<button className="home-page-button" onClick={ goHome } >
			<i className="material-icons">home</i>{children}
		</button>
	);
};

export default HomePageButton;