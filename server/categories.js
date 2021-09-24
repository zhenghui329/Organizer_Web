const { v4: uuidv4 } = require('uuid');
const users = require('./users');

const getCategories = (username) => {
  const userData = users.getUserData(username);
  if(!userData){
    return;
  }
  const categories = userData.categories;
  return categories;
}

// duplicate category name is not allowed
const addCategory = ({ username, category }) => {
  const categories = getCategories(username);
  if(!categories){
    return;
  }
  const duplicate = isDuplicate({ categories, toAddName:category.categoryName });
  if(duplicate){
    return;
  }
  const categoryId = uuidv4();
  categories[categoryId] = { ...category, username, categoryId, listCount:0 };
  changeCatCount({ username, increment:true });
  return categories[categoryId];
};

// check if the category name has existed
const isDuplicate = ({ categories, toAddName }) => {
	const duplicate = Object.values(categories).filter( cat => 
	    cat.categoryName.toLowerCase() === toAddName.toLowerCase()
	  );
	if(duplicate.length){
	   return true;
	}
	return false;
};

const readCategory = ({ username, categoryId }) => {
  const categories = getCategories(username);
  if(!categories || !categories[categoryId] ){
   	return;
  }
  return categories[categoryId];
};

const readAll = (username) => {
  const categories = getCategories(username);
  if(!categories){
   	return;
  }
  return Object.values(categories);
}

const getDefaultCategory = (username) => {
  const categories = getCategories(username);
  if(!categories){
   	return;
  }
  const defaultCat = Object.values(categories).filter( cat => 
  	cat.categoryName === 'default' 
  );
  if(defaultCat.length) {
  	return defaultCat[0];
  }
  const defaultCategory = {
    categoryName: 'default',
	username,
  };
  return addCategory(defaultCategory);
};

const replaceCategory = ({ username, categoryId, category }) => {
  const categories = getCategories(username);
  if(!categories || !categories[categoryId] ){
   	return;
  }
  categories[categoryId] = { ...category, categoryId };
  return categories[categoryId];
};

// remove a category except 'default' category
const removeCategory = ({ username, categoryId }) => {
  const categories = getCategories(username);
  const defaultId = getDefaultCategory(username).categoryId;
  if(!categories || !categories[categoryId] || categoryId === defaultId) {
    return;
  }
  const deleted = categories[categoryId];
  delete categories[categoryId];
  changeCatCount({ username, increment:false });
  return deleted;
};

// remove all categories except 'default' category
const removeAll = ({ username }) => {
  const categories = getCategories(username);
  for(const cat of categories) {
  	const categoryId = cat.categoryId;
  	if(cat.categoryName !== 'default'){
  	  	removeCategory({ username, categoryId });
  	} 
  }
  return categories;
};

const changeCatCount = ({ username, increment }) => {
  const userData = users.getUserData(username);
  if(!userData){
    return;
  }
  const count = userData.categoryCount || 0;
  userData.categoryCount = increment? (count + 1) : (count - 1);
};

module.exports = {
  addCategory,
  readCategory,
  readAll,
  getDefaultCategory,
  replaceCategory,
  removeCategory,
  removeAll,
};