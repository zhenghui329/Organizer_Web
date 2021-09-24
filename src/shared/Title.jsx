import React from 'react';

const Title = ({ className, children, onClick }) => {
	return(
		<div className={className} onClick={onClick} >
			{children}
		</div>
	);
};

export default Title;