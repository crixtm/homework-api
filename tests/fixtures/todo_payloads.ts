export type TodoCreatePayload = {
  title: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  userId?: number;
};

export type TodoUpdatePayload = Partial<TodoCreatePayload>;

export const newTodoPayload: TodoCreatePayload = {
  title: 'Buy milk',
  completed: false,
  priority: 'high',
  userId: 101
};

export const updateTodoPayload: TodoUpdatePayload = {
  title: 'Buy milk and bread',
  completed: true,
  priority: 'medium'
};