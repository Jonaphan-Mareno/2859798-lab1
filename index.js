const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
const db = new sqlite3.Database('./my-database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY, 
        title TEXT, 
        Description TEXT, 
        Due_date TEXT, 
        Topic TEXT, 
        status TEXT,
        is_archived INTEGER DEFAULT 0
    )`);
});
app.get('/api/tasks', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
app.post('/api/addtasks', (req, res) => {
    const { title, Description, Due_date, Topic, status } = req.body;
    const query = "INSERT INTO tasks (title, Description, Due_date, Topic, status, is_archived) VALUES (?, ?, ?, ?, ?, 0)";
    
    db.run(query, [title, Description, Due_date, Topic, status], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task added successfully!", id: this.lastID });
    });
});
app.put('/api/edittask/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, Description, Due_date, Topic, status, is_archived } = req.body;
    
    const query = "UPDATE tasks SET title = ?, Description = ?, Due_date = ?, Topic = ?, status = ?, is_archived = ? WHERE id = ?";
    
    db.run(query, [title, Description, Due_date, Topic, status, is_archived, taskId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task updated successfully!" });
    });
});

module.exports = { app, db };

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}