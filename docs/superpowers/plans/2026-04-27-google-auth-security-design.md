# Google Login Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Google Login and secure API calls in the React frontend.

**Architecture:** Wrap the application with Google OAuth provider, implement a dedicated Login component that exchanges Google ID tokens for local JWTs, and secure all API requests using Axios interceptors.

**Tech Stack:** React, TypeScript, @react-oauth/google, Axios.

---

### Task 1: Install Dependencies

**Files:**
- Modify: `src/web/package.json`

- [ ] **Step 1: Install @react-oauth/google and axios**

Run: `npm install @react-oauth/google axios` in `src/web`

- [ ] **Step 2: Commit**

```bash
git add src/web/package.json src/web/package-lock.json
git commit -m "chore: install @react-oauth/google and axios"
```

### Task 2: Configure Google OAuth Provider

**Files:**
- Modify: `src/web/src/main.tsx`

- [ ] **Step 1: Wrap App with GoogleOAuthProvider**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "PLACEHOLDER_CLIENT_ID";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
```

- [ ] **Step 2: Commit**

```bash
git add src/web/src/main.tsx
git commit -m "feat: configure GoogleOAuthProvider"
```

### Task 3: Implement Google Login Component

**Files:**
- Create: `src/web/src/components/Login.tsx`

- [ ] **Step 1: Create Login component**

```tsx
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`, {
        idToken: credentialResponse.credential
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess(token);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-card" style={{ padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', textAlign: 'center' }}>
        <h2>Welcome to Terra</h2>
        <p>Please sign in to continue</p>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log('Login Failed')}
        />
      </div>
    </div>
  );
};

export default Login;
```

- [ ] **Step 2: Commit**

```bash
git add src/web/src/components/Login.tsx
git commit -m "feat: implement Login component"
```

### Task 4: Secure API Calls with Axios Interceptors

**Files:**
- Modify: `src/web/src/api.ts`

- [ ] **Step 1: Add Authorization interceptor and error handling**

```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://18.193.109.220:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
```

- [ ] **Step 2: Commit**

```bash
git add src/web/src/api.ts
git commit -m "feat: secure API calls with Axios interceptors"
```

### Task 5: Integrate Authentication into App

**Files:**
- Modify: `src/web/src/App.tsx`

- [ ] **Step 1: Add authentication state and logout logic**

```tsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import todoService from './services/todoService';
import { Todo } from './types/todo';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
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
      <Header />
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button onClick={handleLogout}>Logout</button>
      </div>
      
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
```

- [ ] **Step 2: Commit**

```bash
git add src/web/src/App.tsx
git commit -m "feat: integrate authentication into App"
```
