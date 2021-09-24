import React from 'react';

const CreateButtonMain = ({ text, onClick }) => {
	return(
		<button className="create-button-main" onClick={ onClick }>
			<i className="material-icons">post_add</i>{text}
		</button>
	);
};

export default CreateButtonMain;