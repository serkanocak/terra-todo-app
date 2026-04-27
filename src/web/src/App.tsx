import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import FilterTabs, { FilterType } from './components/FilterTabs';
import EmptyState from './components/EmptyState';
import todoService from './services/todoService';
import { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  const getEmptyMessage = () => {
    if (filter === 'active') return "Harika! Devam eden hiç görevin yok.";
    if (filter === 'completed') return "Henüz tamamlanmış bir görevin bulunmuyor.";
    return "Henüz bir görev eklememişsin. Hadi bir tane ekleyelim!";
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setTodos([]);
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

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main className="main-content">
        <AddTodoForm onAdd={handleAddTodo} />
        
        <FilterTabs activeFilter={filter} onFilterChange={setFilter} />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Görevler Yükleniyor...</p>
          </div>
        ) : filteredTodos.length > 0 ? (
          <TodoList 
            todos={filteredTodos} 
            onToggle={handleToggleTodo} 
            onDelete={handleDeleteTodo} 
          />
        ) : (
          <EmptyState message={getEmptyMessage()} />
        )}
      </main>
    </div>
  );
}

export default App;
