import React, { useState, useEffect } from 'react';

const ListSortMenu = ({ setSortby, setIsAscend }) => {
    // default: updated time descending order
    const [ sortCondition, setSortCondition ] = useState('{ "sortby":"updated", "ascend":false }');

    useEffect( () => {
        const sortValue = JSON.parse(sortCondition);
        setSortby(sortValue.sortby);
        setIsAscend(sortValue.ascend);
    },[sortCondition, setSortby, setIsAscend]);

    const handleChange = (e) => {
        setSortCondition(e.target.value);
    };

    return (
        <div className="sort-selecter">
            <label>Sort by: </label>
            <select value={ sortCondition } onChange={ handleChange }>
                <option value='{ "sortby":"listName", "ascend":true }'>list name ascending</option>
                <option value='{ "sortby":"listName", "ascend":false }'>list name descending</option>
                <option value='{ "sortby":"updated", "ascend":false }'>last updated</option>
                <option value='{ "sortby":"created", "ascend":false }'>new created</option>
                <option value='{ "sortby":"itemCount", "ascend":false }'>total item</option>
            </select>
        </div>
        );

};

export default ListSortMenu;