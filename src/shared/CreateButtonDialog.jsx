import React from 'react';

const CreateButtonDialog = ({ text, onClick }) => {
	return(
		<button className="create-button-dialog" onClick={ onClick }>
			{text}
		</button>
	);
};

export default CreateButtonDialog;