# Task Manager App

A small task manager built with Angular for the Edureka "Getting Started with Angular" course project on Coursera. You can create, view, update and delete tasks.

## What it does

- **Create** a task with an ID, title, description, due date and priority
- **View** all tasks in a table, with search and a status filter
- **Update** a task from the list
- **Delete** a task, with a confirmation first

Tasks are saved in the browser (localStorage), so they are still there after a refresh. There is no backend.

## Run it

You need Node.js and the Angular CLI (`npm install -g @angular/cli`).

```
npm install
ng serve
```

Then open http://localhost:4200.

## Tests

```
ng test
```

## Where things are

Everything is under `src/app`:

- `components/` has the four pages (create, view, update, delete)
- `services/task.ts` holds the tasks and saves them
- `models/task.model.ts` defines what a task looks like
- `pipes/` formats dates and priorities
- `directives/overdue.ts` highlights late tasks
- `guards/task-exists-guard.ts` sends you back to the list if you open a task that doesn't exist
- `app.routes.ts` lists the pages and their URLs
