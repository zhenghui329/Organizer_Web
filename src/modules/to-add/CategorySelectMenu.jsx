import React,{ useState, useEffect } from 'react';
import { fetchCategories } from '../../controller/services';
import sort from '../../controller/sort';

const CategorySelectMenu = ({ username, categoryId, setCategoryId, onError }) => {

    const [ categories, setCategories ] = useState(null);

    useEffect( () => {
    	fetchCategories(username)
		.then( responseJson => {
          const sortbyName = sort.sortBy({ array:responseJson.data, sortby: 'categoryName', ascend: true });
          setCategories(sortbyName);
    	})
    	.catch( (err) => {
      		onError(err);
    	});
    },[username], onError);

    useEffect( () => {
        if(!categoryId && categories) {
            setCategoryId(categories[0].categoryId);
        }
    },[categories]);

    const handleChange = (e) => {
        setCategoryId(e.target.value);
    };

    let menu;
    if(categories){
    	const options = categories.map( (cat) => {
    		return <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
    	});
    	menu = (<select className="cat-select" value={ categoryId } onChange={ handleChange }>
                	{options}
            	</select>);
    } else{
    	menu = <select></select>
    }


	return(
		<div className="cat-selector">
			{menu}
        </div>
	);
};

export default CategorySelectMenu;