const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database('./my-database.db');
db.serialize(() => {
  // Create a table for users
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, Description TEXT,Due_date TEXT,Topic TEXT,status TEXT)");
  db.run("ALTER TABLE tasks ADD status TEXT")
  // Clear old data and insert a couple of names for testing
  db.run("DELETE FROM tasks");
db.run("INSERT INTO tasks (title, Description, Due_date, Topic,status) VALUES ('Buy groceries', 'Get milk and eggs', 'Today', 'Errands','Todo')");
  db.run("INSERT INTO tasks (title, Topic,status) VALUES ('Finish coding project', 'Work','Todo')");
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tasks', (req, res) => {
  // Fetch all rows from the users table
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Send the database rows back to the frontend
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} in your browser lil bro.`);
});