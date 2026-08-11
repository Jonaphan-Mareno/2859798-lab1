import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET: Fetch all tasks
export async function GET() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            if (err) resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            else resolve(NextResponse.json(rows));
        });
    });
}

// POST: Add a new task
export async function POST(req) {
    const { title, Description, Due_date, Topic, status } = await req.json();
    
    return new Promise((resolve) => {
        const query = "INSERT INTO tasks (title, Description, Due_date, Topic, status, is_archived) VALUES (?, ?, ?, ?, ?, 0)";
        db.run(query, [title, Description, Due_date, Topic, status], function(err) {
            if (err) resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            else resolve(NextResponse.json({ message: "Task added successfully!", id: this.lastID }));
        });
    });
}