import React from 'react';
import Title from '../../shared/Title';
import pageType from '../../controller/page-types';

const PageTitle = ({ mainTitle, subTitle, setPageView }) => {

	const goToIndex = () => {
		setPageView({ reqData:null, view:pageType.INDEX });
	}

	return(
		<div className="page-title" >
			<Title className="main-title" onClick={ goToIndex }>{mainTitle}</Title> 
			<Title className="sub-title">{subTitle}</Title>
		</div>
	);
};

export default PageTitle;