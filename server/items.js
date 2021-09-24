
const { v4: uuidv4 } = require('uuid');
const lists = require('./collectionLists');

const getItems = (listId) => {
  const list = lists.readList(listId);
  if(!list){
    return;
  }
  return list.items;
}

const addItem = ({ listId, item }) => {
  const items = getItems(listId);
  if(!items){
    return;
  }
  const duplicate = isDuplicate({ items, toAddName:item.itemName });
  if(duplicate){
    return;
  }
  const itemId = uuidv4();
  items[itemId] = { ...item, itemId, created:Date.now(), updated:Date.now() };
  lists.updateTimestamp(listId);
  lists.changeItemCount({ listId, increment:true });
  return items[itemId];
};

// duplicate item name in the same list is not allowed
const isDuplicate = ({ items, toAddName }) => {
  const duplicate = Object.values(items).filter( element => 
    element.itemName.toLowerCase() === toAddName.toLowerCase()
  );
  if(duplicate.length){
    return true;
  }
  return false;
};

const readItem = ({ listId, itemId }) => {
  const items = getItems(listId);
  if(!items || !items[itemId]){
    return;
  }
  return items[itemId];
};

const readOneList = (listId) => {
  const items = getItems(listId);
  if(!items){
    return;
  }
  return Object.values(items);
};

const readAll = () => {
  let allItems = {};
  const allLists = lists.readAll();
  allLists.map( list => {
    allItems = {...allItems, ...list.items};
  });
  return Object.values(allItems);
};

const replaceItem = ({ oldListId, itemId, item }) => {
  const items = getItems(item.listId);
  if(!items || !items[itemId]){
      return;
  }
  // if list has changed
  if(oldListId !== item.listId){
    removeItem({ listId:oldListId, itemId });
  }
  items[itemId] = { ...item, updated: Date.now() };
  lists.updateTimestamp(item.listId);
  return items[itemId];
};

const removeItem = ({ listId, itemId }) => {
  const items = getItems(listId);
  if(!items || !items[itemId]){
    return;
  }
  const deleted = items[itemId];
  delete items[itemId];
  lists.changeItemCount({ listId, increment:false });
  return deleted;
};

// This operation completely deletes all items of a list
const removeAll = (listId) => {
  const items = getItems(listId);
  if(!items){
    return;
  }
  items = {};
  lists.readList(listId).itemCount = 0;
  return items;
};

module.exports = {
  addItem,
  readOneList,
  readItem,
  readOneList,
  readAll,
  replaceItem,
  removeItem,
  removeAll,
};