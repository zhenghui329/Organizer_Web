import React from 'react';

const LoginButton = ({ text, onClick }) => {
	return(
		<button className="login-button" onClick={ onClick } >
			{text}
		</button>
	);
};

export default LoginButton;