import React from 'react';
import { Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-title">{todo.title}</span>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(todo.id)}
        title="Sil"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoItem;
