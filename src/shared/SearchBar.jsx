import React, { useState } from 'react';

const SearchBar = ({ setKeywords }) => {

  const [ text, setText ] = useState('');

  const handleEnterKey = (e) => {
  	const code = e.keyCode || e.which;
    if(code === 13) { 
    	setKeywords(text);
    } 
  };

  return (
      <div className="search-bar">
        <input 
        	className="search-bar-input" 
        	placeholder="search collections" 
        	onChange={ (e) => setText(e.target.value) }
        	onKeyPress={ handleEnterKey }/>
        <i className="material-icons search-icon" onClick={ () => setKeywords(text) }>search</i>
        </div>
  );

};

export default SearchBar;