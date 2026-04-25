import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import todoService from './services/todoService';
import { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error("Todo'lar yüklenirken hata oluştu:", err);
      setError("Veriler yüklenemedi. Backend çalışıyor mu?");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await todoService.createTodo(title);
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error("Ekleme hatası:", err);
      alert("Görev eklenemedi! Backend'i kontrol edin.");
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ));
      
      await todoService.toggleTodo(id);
    } catch (err) {
      console.error("Toggle hatası:", err);
      fetchTodos(); 
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("Görev silinemedi!");
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <AddTodoForm onAdd={handleAddTodo} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Görevler Yükleniyor...</p>
          </div>
        ) : (
          <TodoList 
            todos={todos} 
            onToggle={handleToggleTodo} 
            onDelete={handleDeleteTodo} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
