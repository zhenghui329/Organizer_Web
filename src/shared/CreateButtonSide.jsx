import React from 'react';

const CreateButtonSide = ({ text, onClick }) => {
	return(
		<button className="create-button-side" onClick={ onClick }>
			<i className="material-icons">add</i>{text}
		</button>
	);
};

export default CreateButtonSide;