import api from '../api';
import { Todo } from '../types/todo';

const todoService = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (title: string): Promise<Todo> => {
    const response = await api.post('/todos', { 
      title: title, 
      isCompleted: false 
    });
    return response.data;
  },

  updateTodo: async (id: string, updatedTodo: Partial<Todo>): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, updatedTodo);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  }
};

export default todoService;
