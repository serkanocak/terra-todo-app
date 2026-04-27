import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd(title);
    setTitle('');
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni bir görev ekle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        <Plus size={20} />
        <span>Ekle</span>
      </button>
    </form>
  );
};

export default AddTodoForm;
