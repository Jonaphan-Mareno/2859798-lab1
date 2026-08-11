const request = require('supertest');
const { app, db } = require('./index');

describe('To-Do API Real Behavior Tests', () => {
    let createdTaskId; // Remembers the ID for the next tests

    // Test 1: CREATE
    it('1. should create a new task successfully', async () => {
        const response = await request(app)
            .post('/api/addtasks')
            .send({
                title: 'Test Task',
                Description: 'This is an automated test',
                Topic: 'Testing',
                Due_date: '2026-08-11',
                status: 'Todo'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Task added successfully!');
        expect(response.body).toHaveProperty('id');
        
        createdTaskId = response.body.id; 
    });

    // Test 2: READ
    it('2. should fetch tasks and find the newly created task', async () => {
        const response = await request(app).get('/api/tasks');
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        
        // Search for the task we just created
        const myTask = response.body.find(task => task.id === createdTaskId);
        
        expect(myTask).toBeDefined();
        expect(myTask.title).toBe('Test Task');
        expect(myTask.is_archived).toBe(0);
    });

    // Test 3: UPDATE
    it('3. should update the task to be archived', async () => {
        const response = await request(app)
            .put(`/api/edittask/${createdTaskId}`)
            .send({
                title: 'Test Task',
                Description: 'This is an automated test',
                Topic: 'Testing',
                Due_date: '2026-08-11',
                status: 'Todo',
                is_archived: 1 // Archiving it!
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Task updated successfully!');
    });

    // Cleanup: This MUST be at the very end to close the database
    afterAll((done) => {
        db.close(done);
    });
});