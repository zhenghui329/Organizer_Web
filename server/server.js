const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const path = require('path')
const serveStatic = require('serve-static')

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
// app.use(express.static('./build'));
app.use(serveStatic(path.join(__dirname, 'build')))

// app.get('/', function(req, res){
//    res.redirect('/build');
// });

const port = process.env.PORT || 8000;
app.listen(port);
console.log('server started ' + port);

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

// app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );
