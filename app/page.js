"use client"; // Tells Next.js this is a frontend component
import { useState, useEffect } from 'react';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [sortBy, setSortBy] = useState('Topic');
    const [newTask, setNewTask] = useState({ title: '', Description: '', Topic: '', Due_date: '' });
    
    // Modal State
    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks on load
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data);
    };

    // Add a Task
    const handleAddTask = async () => {
        if (!newTask.title) return alert("Title is required!");
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newTask, status: 'Todo' })
        });
        setNewTask({ title: '', Description: '', Topic: '', Due_date: '' });
        loadTasks();
    };

 

    // Save Edit
    const handleSaveEdit = async () => {
        await fetch(`/api/tasks/${editingTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingTask)
        });
        setEditingTask(null);
        loadTasks();
    };

    // Sort Logic
    const sortedTasks = [...tasks].sort((a, b) => {
        const valA = a[sortBy] || "";
        const valB = b[sortBy] || "";
        return valA > valB ? 1 : -1;
    });

    const currentTasks = sortedTasks.filter(t => t.is_archived === 0);
    const archivedTasks = sortedTasks.filter(t => t.is_archived === 1);
    const today = new Date().toISOString().split('T')[0];

    // Helper to render a single card
    const renderCard = (task) => {
        const isOverdue = task.Due_date && task.Due_date < today && task.status !== "Complete" && task.is_archived === 0;
        
        return (
            <div key={task.id} className={`card ${task.is_archived === 1 ? 'archived-look' : ''}`}>
                <div className="badge-container">
                    <span className="topic-badge">{task.Topic || 'No Topic'}</span> 
                    <span className="status-badge">{task.status}</span> 
                    {isOverdue && <span className="overdue-badge">Overdue</span>}
                </div>
                <h3>{task.title}</h3>
                <p>{task.Description || 'No description provided'}</p>
                <div style={{ marginTop: 'auto' }}>
                    <p><strong>Due:</strong> {task.Due_date || 'No date set'}</p>
                    <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '10px 0' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setEditingTask(task)} style={{ flex: 1, padding: '5px' }}>Edit</button>
        
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main>
            <h1>To do list</h1>

            <div className="controls-container">
                <input type="text" placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
                <input type="text" placeholder="Description" value={newTask.Description} onChange={e => setNewTask({...newTask, Description: e.target.value})} />
                <input type="text" placeholder="Topic" value={newTask.Topic} onChange={e => setNewTask({...newTask, Topic: e.target.value})} />
                <input type="date" value={newTask.Due_date} onChange={e => setNewTask({...newTask, Due_date: e.target.value})} />
                <button onClick={handleAddTask}>Add a Task</button>
            </div>

            <div className="controls-container">
                <label><strong>Sort by: </strong></label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="Topic">Topic</option>
                    <option value="status">Status</option>
                    <option value="Due_date">Due Date</option>
                </select>
            </div>

            <hr style={{ border: 0, borderTop: '2px solid #ccc', margin: '20px 0' }} />

            <h2>Current Tasks</h2>
            <div className="card-container">
                {currentTasks.length > 0 ? currentTasks.map(renderCard) : <p>No current tasks.</p>}
            </div>

            <hr style={{ border: 0, borderTop: '2px solid #ccc', margin: '40px 0' }} />

            <h2>Archived Tasks</h2>
            <div className="card-container">
                {archivedTasks.length > 0 ? archivedTasks.map(renderCard) : <p>No archived tasks.</p>}
            </div>

            {/* Edit Modal */}
            {editingTask && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 style={{ marginTop: 0 }}>Edit Task</h2>
                        <input type="text" value={editingTask.title} onChange={e => setEditingTask({...editingTask, title: e.target.value})} placeholder="Title" />
                        <input type="text" value={editingTask.Description} onChange={e => setEditingTask({...editingTask, Description: e.target.value})} placeholder="Description" />
                        <input type="date" value={editingTask.Due_date} onChange={e => setEditingTask({...editingTask, Due_date: e.target.value})} />
                        <input type="text" value={editingTask.Topic} onChange={e => setEditingTask({...editingTask, Topic: e.target.value})} placeholder="Topic" />
                        
                        <label>Status:</label>
                        <select value={editingTask.status} onChange={e => setEditingTask({...editingTask, status: e.target.value})}>
                            <option value="Todo">Todo</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Complete">Complete</option>
                        </select>
                        
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="checkbox" checked={editingTask.is_archived === 1} onChange={e => setEditingTask({...editingTask, is_archived: e.target.checked ? 1 : 0})} />
                            Archive this task
                        </label>
                        
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button onClick={handleSaveEdit} style={{ flex: 1, background: '#28a745' }}>Save</button>
                            <button onClick={() => setEditingTask(null)} style={{ flex: 1, background: '#6c757d' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}