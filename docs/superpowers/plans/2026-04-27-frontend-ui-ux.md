# Frontend UI/UX Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Terra Todo App frontend into a polished, modern, and interactive application with improved design, icons, and animations.

**Architecture:** We will use `lucide-react` for iconography and `framer-motion` for smooth UI transitions. The design will follow a modern dark mode theme with glassmorphism effects.

**Tech Stack:** React 18, Vite, Framer Motion, Lucide React, CSS.

---

### Task 1: Setup & Dependencies

**Files:**
- Modify: `src/web/package.json`
- Modify: `src/web/src/App.css`

- [ ] **Step 1: Install frontend dependencies**
Run: `cd src/web && npm install lucide-react framer-motion`

- [ ] **Step 2: Update CSS variables and global reset**
```css
/* src/web/src/App.css updates */
:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --bg-color: #0f172a;
  --card-bg: rgba(30, 41, 59, 0.7); /* Translucency for glass effect */
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  /* ... rest of existing variables ... */
}
/* Add backdrop-filter to cards */
.app-container, .login-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

- [ ] **Step 3: Commit**
```bash
git add src/web/package.json src/web/src/App.css
git commit -m "chore: setup UI dependencies and glassmorphism styles"
```

---

### Task 2: Modern Login Page Redesign

**Files:**
- Modify: `src/web/src/components/Login.tsx`
- Modify: `src/web/src/App.css`

- [ ] **Step 1: Redesign Login component**
Replace inline styles with CSS classes and add a modern layout.

```tsx
import { GoogleLogin } from '@react-oauth/google';
import { Shield } from 'lucide-react';
// ... rest of imports

const Login = ({ onLoginSuccess }: LoginProps) => {
  // ... handleSuccess ...
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon-container">
          <Shield size={48} className="login-icon" />
        </div>
        <h2>Terra Todo</h2>
        <p>Your secure personal task manager</p>
        <div className="google-login-wrapper">
          <GoogleLogin onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Add Login specific styles**
Add `.login-page`, `.login-card`, etc., to `App.css`.

- [ ] **Step 3: Commit**
```bash
git add src/web/src/components/Login.tsx src/web/src/App.css
git commit -m "feat: redesign login page with modern UI"
```

---

### Task 3: Icons & Component Polish

**Files:**
- Modify: `src/web/src/components/TodoItem.tsx`
- Modify: `src/web/src/components/Header.tsx`
- Modify: `src/web/src/components/AddTodoForm.tsx`
- Modify: `src/web/src/App.tsx`

- [ ] **Step 1: Add icons to TodoItem (Trash, Check)**
Replace the "Delete" text with a Lucide `Trash2` icon.

- [ ] **Step 2: Add icon to AddTodoForm button**
Add a `Plus` icon to the "Add" button.

- [ ] **Step 3: Integrate Logout button into Header**
Improve the placement of the logout button using the `LogOut` icon.

- [ ] **Step 4: Commit**
```bash
git add src/web/src/components/
git commit -m "feat: integrate Lucide icons and polish components"
```

---

### Task 4: Framer Motion Animations

**Files:**
- Modify: `src/web/src/components/TodoList.tsx`
- Modify: `src/web/src/components/TodoItem.tsx`

- [ ] **Step 1: Wrap TodoList with AnimatePresence**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <ul className="todo-list">
      <AnimatePresence>
        {todos.map(todo => (
          <motion.li 
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
```

- [ ] **Step 2: Commit**
```bash
git add src/web/src/components/TodoList.tsx
git commit -m "feat: add entry/exit animations for todo items"
```

---

### Task 5: Filtering & Empty States

**Files:**
- Modify: `src/web/src/App.tsx`
- Create: `src/web/src/components/FilterTabs.tsx`

- [ ] **Step 1: Implement filtering logic in App.tsx**
Add a `filter` state (`'all' | 'active' | 'completed'`) and filter the `todos` array before rendering.

- [ ] **Step 2: Create FilterTabs component**
A clean UI to switch between filters.

- [ ] **Step 3: Enhance Empty State**
Show a "No tasks found" message with a Lucide icon when the list is empty.

- [ ] **Step 4: Commit**
```bash
git add src/web/src/
git commit -m "feat: implement filtering and enhanced empty states"
```
