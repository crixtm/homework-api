import { test, expect } from '@playwright/test';
import { newTodoPayload, updateTodoPayload } from '@fixtures/todo_payloads';
import { TodosApiClient } from '@helpers/api_client';

test.describe('MockAPI Dog Todos API', () => {
  test('GET /todos should return list of todo items', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.getTodos();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);

    if (body.length > 0) {
      const firstItem = body[0] as Record<string, unknown>;
      expect(firstItem.id).toBeDefined();
      expect(firstItem.title).toBeDefined();
      expect(typeof firstItem.completed).toBe('boolean');
    }
  });

  test('GET /todos should accept query params for filtering', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.getTodos({
      completed: 'true',
      page: '1',
      limit: '10'
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('POST /todos should returns a valid response', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.create(newTodoPayload);
    expect(response.status()).toBe(201);

    const createdTodo = await response.json();
    expect(createdTodo.title).toBe("New task");
    expect(createdTodo.completed).toBe(false);
    expect(createdTodo.priority).toBe("medium");
  });

  test('GET /todos/1 should return a single todo', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.getTodoById(1);
    expect(response.status()).toBe(200);
    const todo = await response.json();
    expect(todo.id).toBe(1);
    expect(todo.title).toBe("Complete project documentation");
    expect(todo.completed).toBe(false);
    expect(todo.priority).toBe("high");

  });

  test('PUT /todos/1 should return 501 ', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.replace(1, updateTodoPayload);
    expect(response.status()).toBe(501); //TODO report an issue about the inappropriate status code
  });

  test('PATCH /todos/1 should update a todo', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.patch(1, { completed: true });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.message).toContain('Todo updated successfully');
  });

  test('DELETE /todos/1 should delete a todo', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.delete(1);
    expect(response.status()).toBe(200);
  });

  test('GET /todos/non-existing-id should return an error contract', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.getTodoById('non-existing-id');
    expect(response.status()).toBe(404);
  });

  test('POST /todos with invalid payload should still match the configured mock response', async ({ request }) => {
    const todoApi = new TodosApiClient(request);

    const response = await todoApi.create({
      title: '',
      completed: 'invalid' as unknown as boolean
    });
    expect(response.status()).toBe(400); //TODO report an issue

  });
});