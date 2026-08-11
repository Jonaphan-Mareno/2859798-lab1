import sqlite3 from 'sqlite3';
import path from 'path';

const isTest = process.env.NODE_ENV === 'test';
const dbPath = path.resolve(process.cwd(), 'my-database.db');
const db = new sqlite3.Database(dbPath);

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

export default db;