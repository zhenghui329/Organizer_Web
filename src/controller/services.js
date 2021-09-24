const convertNetworkError = (err) => Promise.reject({ code: 'NETWORK-ERROR' });

const convertServiceError = (err) => 
	Promise.reject({ status:err.status, code: err.message });

export const fetchLoginStatus = () => {
	return fetch(`/session`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchLogin = (username) => {
	return fetch(`/session`, { 
    	method: 'POST', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ username }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchLogout = () => {
	return fetch(`/session`, {
        method: 'DELETE',
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchTheme = (username) => {
	return fetch(`/users/${username}/theme`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const updateTheme = ({ username, theme }) => {
	return fetch(`/users/${username}/theme`, { 
    	method: 'PUT', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'theme': theme }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};


//categories
export const fetchCategories = (username) => {
	return fetch(`/users/${username}/categories`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchSingleCategory = ({ username, categoryId }) => {
	return fetch(`/users/${username}/categories/${categoryId}`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const addCategory = ({ username, category }) => {
	return fetch(`/users/${username}/categories`, { 
    	method: 'POST', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'category': category }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const updateCategory = ({ username, categoryId, category }) => {	
	return fetch(`/users/${username}/categories/${categoryId}`, { 
    	method: 'PUT', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'category': category }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const deleteCategory = ({ username, categoryId, complete }) => {
	return fetch(`/users/${username}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'complete': complete }),
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const deleteALLCategory = ({ username, complete }) => {
	return fetch(`/users/${username}/categories`, {
        method: 'DELETE',
        headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'complete': complete }),
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

// lists
export const fetchAllLists = () => {
	return fetch(`/collectionLists`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchListsBy = (query) => {
	return fetch(`/collectionLists?${query}`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchSingleList = (listId) => {
	return fetch(`/collectionLists/${listId}`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const addList = ({ username, list }) => {
	return fetch(`/collectionLists`, { 
    	method: 'POST', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username, 'list': list }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const updateSingleList = ({ username, oldCatId, listId, list }) => {
	return fetch(`/collectionLists/${listId}`, { 
    	method: 'PUT', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username, 'oldCatId':oldCatId, 'list': list }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const deleteSingleList = ({ username, listId }) => {
	return fetch(`/collectionLists/${listId}`, {
        method: 'DELETE',
        headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username }),
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const deleteListBy = ({ username, query }) => {
	return fetch(`/collectionLists?${query}`, {
        method: 'DELETE',
        headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username }),
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};


// items
export const fetchItems = (listId) => {
	return fetch(`/collectionLists/${listId}/items`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const fetchSingleItem = ({ listId, itemId }) => {
	return fetch(`/collectionLists/${listId}/items/${itemId}`, { 
    	method: 'GET', 
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const addItem = ({ username, listId, item }) => {
	return fetch(`/collectionLists/${listId}/items`, { 
    	method: 'POST', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username, 'item': item }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const updateItem = ({ username, listId, itemId, item, oldListId }) => {	
	return fetch(`/collectionLists/${listId}/items/${itemId}`, { 
    	method: 'PUT', 
    	headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username, 'item': item, 'oldListId': oldListId }),
	})
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const deleteItem = ({ username, listId, itemId }) => {
	return fetch(`/collectionLists/${listId}/items/${itemId}`, {
        method: 'DELETE',
        headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username }),
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};

export const deleteAllItems = ({ username, listId }) => {
	return fetch(`/collectionLists/${listId}/items`, {
        method: 'DELETE',
        headers: new Headers({
        	'content-type': 'application/json', 
    	}),
    	body: JSON.stringify({ 'username': username }),
    })
	.catch( convertNetworkError )
	.then( response => { 
		if(!response.ok) {
			return response.json().then( convertServiceError );
		}
		return response.json();
	});
};
