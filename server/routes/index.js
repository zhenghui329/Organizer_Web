const session = require('../session');
const theme = require('../theme');
const categories = require('../categories');
const collectionLists = require('../collectionLists');
const items = require('../items');
const auth = require('../auth');

const web = (res) => {
  return ({ message, status, data }={}) => {
    if(!message && !data) {
      data = 'OK';
    }
    res.status(status || 200).json({ status, message, data });
  };
};

const routes = {
  session: { },
  theme: { },
  categories: {
    one: {},
    all: {},
  },
  lists: {
    one: {},
    all: {},
  },
  items: {
    one: {},
    all: {},
  }
};


// Session
routes.session.status = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }
  web(res)({ data: session.getSession(sid) } );
};

routes.session.create = ( req, res ) => {
  const username = req.body.username;
  const sessionInfo = session.attemptCreate(username);
  if(!sessionInfo) {
    web(res)({ status: 403, message: 'USERNAME_DENIED' });
    return;
  }
  res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60*30 } );
  web(res)({ data: session });
};

routes.session.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }
  res.clearCookie('sid');
  session.remove(sid);
  web(res)();
};



// Theme
routes.theme.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }
  const foundTheme = theme.getTheme(username);
  web(res)({ data: foundTheme });
};


routes.theme.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({ status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const themeValue = req.body.theme;
  theme.setTheme({ username, theme: themeValue });
  web(res)();
};



// categories
// this service is only open to logged-in users
routes.categories.all.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const all = categories.readAll(username);
  if(!all){
    web(res)({status: 404, message: 'NO_SUCH_USER' });
    return;
  }
  web(res)({ data: all });
};

// this service only send category info, it is open to all users 
routes.categories.one.read = ( req, res ) => {
  const categoryId = req.params.categoryId;
  const username = req.params.username;
  const category = categories.readCategory({ username, categoryId });
  if(!category){
    web(res)({ status: 404, message: 'NO_SUCH_CAT' });
    return;
  }
  web(res)({ data: category } );
};

// add, edit, delete services is only open to the owner 
routes.categories.one.add  = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  let category = req.body.category;
  const trimmed = auth.process(category.categoryName);
  category = { ...category, categoryName:trimmed};
  const isValid = auth.isPermittedCatName(category.categoryName);
  if(!isValid ){
    web(res)({ status: 400, message: 'CAT_NAME_DENIED' });
    return;
  }

  const added = categories.addCategory({ username, category });
  if(!added){
    web(res)({ status: 400, message: 'DUPLICATE_CAT_NAME' });
    return;
  }
  web(res)({ data: added } );
};


routes.categories.one.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const categoryId = req.params.categoryId;
  const category = req.body.category;
  const updated = categories.replaceCategory({ username, categoryId, category });
  if(!updated){
    web(res)({ status: 404, message: 'NO_SUCH_CAT' });
    return;
  }
  web(res)({ data: updated } );
};


routes.categories.one.delete = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const categoryId = req.params.categoryId;
  const complete = req.body.complete;
  if(complete == null){
    web(res)({ status: 400, message: 'FAILED_TO_DELETE_CAT' });
    return;
  }
  const defaultId = categories.getDefaultCategory(username).categoryId;
  if(categoryId === defaultId){
    web(res)({ status: 403, message: 'ATTEMPT_TO_DELETE_DEFAULT' });
    return;
  }
  const deleted = categories.removeCategory({ username, categoryId });
  if(!deleted){
    web(res)({ status: 404, message: 'NO_SUCH_CAT' });
    return;
  }
  // remove lists in the category at the same time
  collectionLists.removeOneCategory({ username, categoryId, complete, defaultId });
  web(res)({ data: deleted } );
};


routes.categories.all.delete = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const complete = req.body.complete;
  if(complete == null){
    web(res)({ status: 400, message: 'FAILED_TO_DELETE_CAT' });
    return;
  }
  const all = categories.removeAll({ username });
  if(!all){
    web(res)({ status: 404, message: 'NO_SUCH_CAT' });
    return;
  }
  // remove all lists
  const defaultId = categories.getDefaultCategory(username).categoryId;
  collectionLists.removeAll({ username, all, complete, defaultId }); 
  web(res)({ data: all } );
};


// this service is open to all viewers except query request
// query request is only open to logged-in users
// this service should send partial response(not perform in this project)
routes.lists.all.read = ( req, res ) => {
  const username = req.query.username;
  const categoryId = req.query.categoryId;
  if(username || categoryId){
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
      res.clearCookie('sid');
      web(res)({ status: 401, message: 'NO_VALID_SESSION' });
      return;
    }
  }
  if(username){
    web(res)({ data: collectionLists.readOneUser(username) });
    return;
  }
  if(categoryId){
    web(res)({ data: collectionLists.readOneCategory(categoryId) });
    return;
  }
  web(res)({ data: collectionLists.readAll() } );
};

// this service is open to all viewers
// this service should send partial response(not perform in this project)
routes.lists.one.read = ( req, res ) => {
  const listId = req.params.listId;
  const list = collectionLists.readList(listId);
  if(!list){
    web(res)({status: 404, message: 'NO_SUCH_LIST' });
    return;
  }
  web(res)({ data: list } );
};


routes.lists.one.add = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  let list = req.body.list;
  const category = categories.readCategory({ username, categoryId:list.categoryId });
  if(!category){
    web(res)({status: 400, message: 'NO_SUCH_CAT' });
    return;
  }

  const trimmed = auth.process(list.listName);
  list = { ...list, listName:trimmed };
  const isValid = auth.isPermittedTitle(list.listName);
  if(!isValid ){
    web(res)({ status: 400, message: 'LIST_NAME_DENIED' });
    return;
  }
  const isValidLength = auth.isPermittedLength({ input: list.description, max: 500 });
  if(!isValidLength){
    web(res)({ status: 400, message: 'TOO_MUCH_INPUT_LIST' });
    return;
  }

  const added = collectionLists.addList({ username, list });
  if(!added){
    web(res)({status: 400, message: 'DUPLICATE_LIST_NAME' });
    return;
  }
  web(res)({ data: added } );
};


routes.lists.one.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const listId = req.params.listId;
  const list = req.body.list;
  const oldCatId = req.body.oldCatId;
  const category = categories.readCategory({ username, categoryId: list.categoryId });
  if(!category){
    web(res)({status: 404, message: 'NO_SUCH_CAT' });
    return; 
  }
  const updated = collectionLists.replaceList({ oldCatId, listId, list });
  if(!updated){
    web(res)({status: 404, message: 'NO_SUCH_LIST' });
    return;
  }
  web(res)({ data: updated } );
};


routes.lists.one.delete = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const listId = req.params.listId;
  const deleted = collectionLists.removeList({ username, listId });
  if(!deleted){
    web(res)({status: 404, message: 'NO_SUCH_LIST' });
    return;
  }
  // remove items in the list
  items.removeAll(listId); 
  web(res)({ data: deleted });
};


// only allowed to delete lists of one category
routes.lists.all.delete = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const categoryId = req.query.categoryId;
  if(categoryId){
    const deleted = collectionLists.removeOneCategory({ categoryId, complete: true });
    if(!deleted){
      web(res)({status: 404, message: 'NO_SUCH_LIST' });
      return;
    }
    web(res)({ data: deleted });
    return;
  }
  web(res)({status: 403, message: 'FORBIDDEN' });
};


// this service is open to all users
// this service should send partial response(not perform in this project)
routes.items.all.read = ( req, res ) => {
  const listId = req.params.listId;
  const all = items.readOneList(listId);
  if(!all){
    web(res)({status: 404, message: 'NO_SUCH_LIST' });
    return;
  }
  web(res)({ data: all });
};

// this service is only open to logged-in users 
routes.items.one.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const itemId = req.params.itemId;
  const listId = req.params.listId;
  const item = items.readItem({ listId, itemId });
  if(!item){
    web(res)({status: 404, message: 'NO_SUCH_ITEM' });
    return;
  }
  web(res)({ data: item } );
};


routes.items.one.add = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }
  
  const listId = req.params.listId;
  const list = collectionLists.readList(listId);
  if(!list){
    web(res)({status: 400, message: 'NO_SUCH_LIST' });
    return;
  }

  let item = req.body.item;
  const trimmed = auth.process(item.itemName);
  item = { ...item, itemName:trimmed };
  const isValid = auth.isPermittedTitle(item.itemName);
  if(!isValid ){
    web(res)({ status: 400, message: 'ITEM_NAME_DENIED' });
    return;
  }
  const isValidLength = auth.isPermittedLength({ input: item.description, max: 2000 });
  if(!isValidLength){
    web(res)({ status: 400, message: 'TOO_MUCH_INPUT' });
    return;
  }
  
  const isValidImg = auth.isValidImgSize(item.img);
  if(!isValidImg){
    web(res)({ status: 400, message: 'LARGER_THAN_5' });
    return;
  }

  const added = items.addItem({ listId, item });
  if(!added){
    web(res)({status: 400, message: 'DUPLICATE_ITEM_NAME' });
    return;
  }
  web(res)({ data: added } );
};


routes.items.one.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }
  
  const itemId = req.params.itemId;
  const listId = req.params.listId;
  const oldListId = req.body.oldListId;
  const item = req.body.item;
  const list = collectionLists.readList(listId);
  if(!list){
    web(res)({status: 400, message: 'NO_SUCH_LIST' });
    return;
  }
  const updated = items.replaceItem({ oldListId, itemId, item });
  if(!updated){
    web(res)({status: 404, message: 'NO_SUCH_ITEM' });
    return;
  }
  web(res)({ data: updated } );
};


routes.items.one.delete = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }

  const itemId = req.params.itemId;
  const listId = req.params.listId;

  const toDeletelist = collectionLists.readList(listId);
  if(!toDeletelist){
    web(res)({status: 404, message: 'NO_SUCH_LIST' });
    return;
  }
  const ownerName = toDeletelist.username;
  if(username !== ownerName) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return; 
  }
  const deleted = items.removeItem({ listId, itemId });
  if(!deleted){
    web(res)({status: 404, message: 'NO_SUCH_ITEM' });
    return;
  }
  web(res)({ data: deleted } );
};


routes.items.all.delete = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({ status: 401, message: 'NO_VALID_SESSION' });
    return;
  }

  const username = req.body.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'ACTION_NOT_PERMITTED' });
    return;
  }
  
  const listId = req.params.listId;
  const deleted = items.removeAll(listId);
  if(!deleted){
    web(res)({status: 404, message: 'NO_SUCH_LIST' });
    return;
  }
  web(res)({ data: deleted } );
};

module.exports = routes;
