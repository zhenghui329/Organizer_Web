# Final Project : Our Collections

This is a single-page web application that let users track, organize and share their collections of anything.
This application is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Launch the application
* This application has been build and ready to be served in a server.
* To launch with Node.js, run `npm install` and `npm start`.<br />
* Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## Basic features
* Users can log in their account(with a username, no password step), create collection categories, lists and items.
* When users first log in, a `default` category with a `Default` list are automatically created.
* Users can upload one image(not larger than 5M) to the item.
* Users can also view other users' categories, lists and items.

## Visibility of contents
There is an authentication step and an authorization step for the visibility of its contents.
* The homepage which shows all users' lists in last updated order and the details of every list are open to all visitors.
* Lists in a specific category, Lists of a specific user and the details of one item are only open to logged-in users.
* Function including add, edit and delete are only open to the collection owner.
* This version provides operations as following: `add new category`, `add new list`, `add new item`, edit a list, delete a list and delete items.

## More features
* Users can search a list in the homepage
* Users can go to "My Page" and see their categories(in alphabetical order) and lists(in last updated order)
* If the user is viewing their own user page, the side menu will have an 'Edit Category' link and the lists can be sorted by users.
* If the users are viewing their own list page, there will be a menu that let users edit and delete the list.
* Users can click `Delete Items` button to enter the delete item mode.
* If users add a new item from a specific list page, the category and list will automatically set to the current list. While if they add an item from the button in the side menu, the alphabetical first list of the first category will be set.
* If they are viewing others' page, these buttons will not show at all.
* Adding or editing an item will automatically set last updated time of the corresponding list.

## To do in the future version
* Add category-editing and item-editing feature. (the server-side code is already done)
* Ask users to confirm before deletion(The back-end code is done)<br />
When users are trying to delete a category(which may have lots of lists and items), allow users to choose completely delete or not. If it is not complete deletion, on delete the category and then move the lists to the default category.<br />
Also allow users to clear the lists in default cateogry, but deleting default category itself is forbidden.
* Add more info field in the item: maker, price, collect date, release date, rate..etc
* Allow users sort items by those fields.
* Add 'Likes' feature to lists and items. Users can see their own 'Likes'.
* Add more view-mode to items: users can choose to view in thumbnail or info card.
* Categories and lists can be set to public or private
* Add multiple themes
* Improve UI layout
* Use partial response to imporve performance
* Try pagination

## API endpoints
```
app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.remove);

app.get('/users/:username/theme', routes.theme.read);
app.put('/users/:username/theme', routes.theme.update);

app.get('/users/:username/categories', routes.categories.all.read);
app.get('/users/:username/categories/:categoryId', routes.categories.one.read);
app.post('/users/:username/categories', routes.categories.one.add);
app.put('/users/:username/categories/:categoryId', routes.categories.one.update);
app.delete('/users/:username/categories/:categoryId', routes.categories.one.delete);
app.delete('/users/:username/categories', routes.categories.all.delete);

app.get('/collectionLists', routes.lists.all.read);
app.get('/collectionLists/:listId', routes.lists.one.read);
app.post('/collectionLists', routes.lists.one.add);
app.put('/collectionLists/:listId', routes.lists.one.update);
app.delete('/collectionLists/:listId', routes.lists.one.delete);
app.delete('/collectionLists', routes.lists.all.delete);

app.get('/collectionLists/:listId/items', routes.items.all.read);
app.get('/collectionLists/:listId/items/:itemId', routes.items.one.read);
app.post('/collectionLists/:listId/items', routes.items.one.add);
app.put('/collectionLists/:listId/items/:itemId', routes.items.one.update);
app.delete('/collectionLists/:listId/items/:itemId', routes.items.one.delete);
app.delete('/collectionLists/:listId/items', routes.items.all.delete);

```



