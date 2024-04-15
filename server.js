const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set up EJS for templating
app.set('view engine', 'ejs');
// Assuming your EJS templates are located in the "views" directory
app.set('views', path.join(__dirname, 'views'));

// In-memory storage for ToDo items
let toDoItems = [];

// Define a route to render the ToDo list
app.get('/', (req, res) => {
  // Render "todo.ejs" EJS template with the toDoItems data
  res.render('todo', { toDoItems });
});

// Define a route to handle adding new ToDo items
app.post('/add', (req, res) => {
  const { item } = req.body;
  if (item) {
    toDoItems.push(item);
  }
  res.redirect('/');
});

// Define a route to handle deleting ToDo items
app.post('/delete', (req, res) => {
  const { index } = req.body;
  toDoItems = toDoItems.filter((_, idx) => idx.toString() !== index);
  res.redirect('/');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('ToDo app listening on port 3000!');
});
