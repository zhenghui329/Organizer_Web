import React from 'react';

const EditButton = ({ text, onClick }) => {
	return(
		<button className="edit-button" onClick={ onClick }>
			<i className="material-icons">edit</i>{text}
		</button>
	);
};

export default EditButton;