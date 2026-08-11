import { GET, POST } from './app/api/tasks/route';
import { PUT } from './app/api/tasks/[id]/route';
import db from './lib/db';

describe('Next.js API Real Behavior Tests', () => {
    let createdTaskId;

    // Test 1: CREATE
    it('1. should create a new task successfully', async () => {
        // Build a standard Request object to send to the Next.js handler
        const req = new Request('http://localhost/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Next.js Test Task',
                Description: 'This is an automated test',
                Topic: 'Testing',
                Due_date: '2026-08-11',
                status: 'Todo'
            })
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Task added successfully!');
        expect(data).toHaveProperty('id');
        
        createdTaskId = data.id; 
    });

    // Test 2: READ
    it('2. should fetch tasks and find the newly created task', async () => {
        const req = new Request('http://localhost/api/tasks', { method: 'GET' });
        const response = await GET(req);
        const data = await response.json();
        
        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBeTruthy();
        
        // Search the returned array for the task we just created
        const myTask = data.find(task => task.id === createdTaskId);
        
        expect(myTask).toBeDefined();
        expect(myTask.title).toBe('Next.js Test Task');
        expect(myTask.is_archived).toBe(0);
    });

    // Test 3: UPDATE (Archive)
    it('3. should update the task to be archived', async () => {
        const req = new Request(`http://localhost/api/tasks/${createdTaskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Next.js Test Task',
                Description: 'This is an automated test',
                Topic: 'Testing',
                Due_date: '2026-08-11',
                status: 'Todo',
                is_archived: 1
            })
        });

        // Next.js dynamic routes pass params as the second argument!
        const response = await PUT(req, { params: { id: createdTaskId } });
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.message).toBe('Task updated!');
    });

    // Cleanup: Close the RAM database so Jest finishes cleanly
    afterAll((done) => {
        db.close(done);
    });
});