import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import type { TodoCreatePayload, TodoUpdatePayload } from '@fixtures/todo_payloads';

export type Todo = {
  id?: string | number;
  title: string;
  completed: boolean;
  priority?: string;
  userId?: number;
  [key: string]: unknown;
};

export class TodosApiClient {
  constructor(private readonly request: APIRequestContext) { }

  async getTodos(params?: Record<string, string>): Promise<APIResponse> {
    return this.request.get('/todos', { params });
  }

  async getTodoById(id: string | number): Promise<APIResponse> {
    return this.request.get(`/todos/${id}`);
  }

  async create(payload: TodoCreatePayload): Promise<APIResponse> {
    return this.request.post('/todos', { data: payload });
  }

  async replace(id: string | number, payload: TodoUpdatePayload): Promise<APIResponse> {
    return this.request.put(`/todos/${id}`, { data: payload });
  }

  async patch(id: string | number, payload: TodoUpdatePayload): Promise<APIResponse> {
    return this.request.patch(`/todos/${id}`, { data: payload });
  }

  async delete(id: string | number): Promise<APIResponse> {
    return this.request.delete(`/todos/${id}`);
  }
}