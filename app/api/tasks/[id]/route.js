import { NextResponse } from 'next/server';
import db from '@/lib/db';

// PUT: Edit a task
export async function PUT(req, { params }) {
    const { id } = params;
    const { title, Description, Due_date, Topic, status, is_archived } = await req.json();

    return new Promise((resolve) => {
        const query = "UPDATE tasks SET title = ?, Description = ?, Due_date = ?, Topic = ?, status = ?, is_archived = ? WHERE id = ?";
        db.run(query, [title, Description, Due_date, Topic, status, is_archived, id], (err) => {
            if (err) resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            else resolve(NextResponse.json({ message: "Task updated!" }));
        });
    });
}
