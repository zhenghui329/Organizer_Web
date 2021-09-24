import React,{ useState, useEffect } from 'react';

const ListSelectMenu = ({ lists, listId, setListId, onError }) => {

    const [ selected, setSelected ] = useState('');

    // select the first list or report no list option when lists changed
    useEffect( () => {
        onError({ code: "CLEAR"});
        if(lists && lists.length) {
            if (!selected) {
               setSelected(lists[0].listId); 
            }
        } else { 
            setSelected('');
            onError({ code: 'NO_LIST_IN_CAT'});
        }
    },[lists]);

    // if the list has been set(when adding from a list page)
    // select it only when componentDidMount
    useEffect( () => {
        if(listId) {
            setSelected(listId);
        }
    },[]);

    useEffect( () => {
        setListId(selected);
    },[setListId,selected]);

    const handleChange = (e) => {
        setSelected(e.target.value); 
    };

    let menu;
    if(lists){
    	const options = lists.map( (list) => {
    		return <option key={list.listId} value={list.listId}>{list.listName}</option>
    	});
    	menu = (<select className="list-select" value={ selected } onChange={ handleChange }>
                	{options}
            	</select>);
    }

	return(
		<div className="list-selector">
			{menu}
        </div>
	);
};

export default ListSelectMenu;