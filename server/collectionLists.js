const { v4: uuidv4 } = require('uuid');
const dummy = require('./dummyData');
const categories = require('./categories');

const collectionLists = { 
  ...dummy.dummyLists,
};

const addList = ({ username, list }) => {
  const categoryId = list.categoryId;
  const toAddCategory = categories.readCategory({ username, categoryId });
  if(!toAddCategory){
    return;
  }
  const duplicate = isDuplicate({ categoryId, toAddName:list.listName });
  if(duplicate){
    return;
  }
  const listId = uuidv4();
  collectionLists[listId] = { ...list, username, listId, itemCount:0, items:{}, created: Date.now(), updated:Date.now() };
  changeListCount({ username, categoryId, increment:true });
  return collectionLists[listId];
};

// duplicate list name in the same category is not allowed
const isDuplicate = ({ categoryId, toAddName }) => {
  const duplicate = Object.values(collectionLists).filter( li => 
    li.categoryId.toLowerCase() === categoryId.toLowerCase() 
      && li.listName.toLowerCase() === toAddName.toLowerCase()
  );
  if(duplicate.length){
    return true;
  }
  return false;
};

const readOneCategory = (categoryId) => {
  return Object.values(collectionLists).filter( li => 
    li.categoryId === categoryId
  );
};

const readOneUser = (username) => {
  return Object.values(collectionLists).filter( li => 
    li.username === username
  );
}

const readList = (listId) => {
  if(!collectionLists[listId]) {
    return;
  }
  return collectionLists[listId];
};

const readAll = () => {
  return Object.values(collectionLists);
}

const replaceList = ({ oldCatId, listId, list }) => {
  if(!collectionLists[listId]) {
    return;
  }
  // if category has changed
  if(oldCatId !== list.categoryId){
    changeListCount({ username:list.username, categoryId:oldCatId, increment:false });
    const newCount = changeListCount({ username:list.username, categoryId:list.categoryId, increment:true });
    if(!newCount) { // newCount must be greater than 0, otherwise the new category does not exist
      return;
    }
  }
  collectionLists[listId] = { ...list, listId, updated:Date.now() };
  return collectionLists[listId];
};

// remove a single list
const removeList = ({ username, listId }) => {
  if(!collectionLists[listId]) {
    return;
  }
  const deleted = collectionLists[listId];
  delete collectionLists[listId];
  changeListCount({ username, categoryId:deleted.categoryId, increment:false });
  return deleted;
};

// This operation deletes lists of one category or 
// moves the lists to 'default' category
// depends on 'complete' value
const removeOneCategory = ({ username, categoryId, complete, defaultId }) => {
  const all = readOneCategory(categoryId);
  for(const element of all) {
    const listId = element.listId;
    if(complete){
      removeList({ username, listId });
    } else {
      replaceList({ oldCatId:categoryId, listId:defaultId, list:element });
    } 
  }
  return all;
};

// This operation removes lists of all categories except the 'default' category
// If complete is false, it moves all lists to 'default' category
const removeAll = ({ username, all, complete, defaultId }) => {
  // all represents all categories of a user
  for(const element of all) {
    const categoryId = element.categoryId;
    if(categoryId !== defaultId){
      removeOneCategory({ username, categoryId, complete, defaultId });
    }
  }
};

const changeItemCount = ({ listId, increment }) => {
  if(!listId || !collectionLists[listId]){
    return;
  }
  const count = collectionLists[listId].itemCount || 0;
  collectionLists[listId].itemCount = increment? (count + 1) : (count - 1);
};

const changeListCount = ({ username, categoryId, increment }) => {
  const category = categories.readCategory({ username, categoryId });
  if(!category){
    return;
  }
  const count = category.listCount || 0;
  category.listCount = increment? (count + 1) : (count - 1);
  return category.listCount;
};

const updateTimestamp = (listId) => {
  const list = {...readList(listId)};
  return replaceList({ oldCatId:list.categoryId, listId, list });
}

module.exports = {
  addList,
  readOneCategory,
  readOneUser,
  readList,
  readAll,
  replaceList,
  removeList,
  removeOneCategory,
  removeAll,
  updateTimestamp,
  changeItemCount,
};