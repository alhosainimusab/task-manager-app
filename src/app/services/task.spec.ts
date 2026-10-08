import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';
import { Task } from '../models/task.model';

const sample = (id: number): Task => ({
  id, title: `T${id}`, description: 'd', dueDate: '2030-01-01', status: 'Pending', priority: 'Low',
});

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
    // Start every test from a known state, whatever the seed data is.
    service.tasks().forEach((t) => service.deleteTask(t.id));
  });

  it('creates and finds a task', () => {
    service.createTask(sample(5));
    expect(service.getTaskById(5)?.title).toBe('T5');
  });

  it('generates the next id after the highest existing one', () => {
    service.createTask(sample(3));
    expect(service.nextId()).toBe(4);
  });

  it('updates only the given fields', () => {
    service.createTask(sample(1));
    service.updateTask(1, { title: 'New', status: 'Completed' });
    expect(service.getTaskById(1)).toEqual({ ...sample(1), title: 'New', status: 'Completed' });
  });

  it('deletes a task', () => {
    service.createTask(sample(1));
    service.deleteTask(1);
    expect(service.tasks().length).toBe(0);
  });

  it('detects duplicate ids, optionally ignoring one', () => {
    service.createTask(sample(1));
    expect(service.idExists(1)).toBe(true);
    expect(service.idExists(1, 1)).toBe(false);
  });

  it('persists to localStorage', () => {
    service.createTask(sample(9));
    expect(JSON.parse(localStorage.getItem('tasks')!)[0].id).toBe(9);
  });
});
