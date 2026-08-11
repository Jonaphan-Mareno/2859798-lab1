# COMS3011A Lab 1 - Next.js Todo Application

## Third-Party Code
*   **`next`**: Chosen as the core React framework to build the UI and handle backend API routes in a single repository.
*   **`react` / `react-dom`**: Chosen as they are required peer dependencies for Next.js to render the component-based user interface[cite: 2].
*   **`sqlite3`**: Chosen as a lightweight, local-first database to persist task data locally without requiring a separate database server[cite: 2].
*   **`jest`**: Chosen as the testing framework to run our automated tests that exercise real behavior[cite: 2].

## Database Design
The application utilizes a single-table SQLite database to store all task information[cite: 2]. 
*   **Table:** `tasks`[cite: 2]
*   **Schema & Relationships:** Because there are no user accounts and the app serves a single local user, a flat single-table design was utilized[cite: 2].
    *   `id` (INTEGER PRIMARY KEY): Unique identifier for the task.
    *   `title` (TEXT): The name of the task[cite: 2].
    *   `Description` (TEXT): Details about the task[cite: 2].
    *   `Due_date` (TEXT): The deadline for the task, stored as `YYYY-MM-DD` so the overdue state can be derived dynamically at read time rather than stored as a status[cite: 2].
    *   `Topic` (TEXT): The category of the task[cite: 2].
    *   `status` (TEXT): The current state of the task (Todo, In-Progress, Complete)[cite: 2].
    *   `is_archived` (INTEGER DEFAULT 0): A boolean flag used to indicate if a task is archived (1) or active (0). Tasks are flagged rather than deleted so they remain viewable[cite: 2].

## Running It
**Requirements:** Node.js (v18 or higher recommended)[cite: 2].

1.  **Install dependencies:**[cite: 2]
    ```bash
    npm install
    ```
2.  **Start the application:**[cite: 2]
    ```bash
    npm run dev
    ```
    The local-first application will be available in your browser at `http://localhost:3000`[cite: 2].
3.  **Run the tests:**[cite: 2]
    To run the deterministic behavioral tests (which execute against a throwaway `:memory:` database):[cite: 2]
    ```bash
    npm test
    ```

---

## AI Declarations

This repository makes use of AI code generation using the following tools: Gemini-Web[Gemini][cite: 1].
This repository does not use AI in-line editing tools[cite: 1].
This repository does not use AI code review[cite: 1].

The preceding document was generated with the assistance of the following: Gemini-Web[Gemini][cite: 1].