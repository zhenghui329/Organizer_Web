import React from 'react';

const CancelButtonDialog = ({ text, onClick }) => {
	return(
		<button className="cancel-button-dialog" onClick={ onClick }>
			{text}
		</button>
	);
};

export default CancelButtonDialog;