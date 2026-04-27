# Frontend Icons and Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Lucide icons and improve component layouts for better UX and aesthetics.

**Architecture:** Update React components to use `lucide-react` icons. Refactor `Header` and `App` to better manage global UI elements like Logout.

**Tech Stack:** React, TypeScript, Lucide React, CSS.

---

### Task 1: Update `TodoItem.tsx`

**Files:**
- Modify: `src/web/src/components/TodoItem.tsx`

- [ ] **Step 1: Import Trash2 icon**
- [ ] **Step 2: Replace "Sil" text with icon**
- [ ] **Step 3: Adjust layout for better alignment**

```tsx
// src/web/src/components/TodoItem.tsx
import { Trash2 } from 'lucide-react';
// ...
<button className="delete-btn" onClick={() => onDelete(todo.id)} title="Sil">
  <Trash2 size={18} />
</button>
```

### Task 2: Update `AddTodoForm.tsx`

**Files:**
- Modify: `src/web/src/components/AddTodoForm.tsx`

- [ ] **Step 1: Import Plus icon**
- [ ] **Step 2: Add icon to button**
- [ ] **Step 3: Ensure button layout is clean**

```tsx
// src/web/src/components/AddTodoForm.tsx
import { Plus } from 'lucide-react';
// ...
<button type="submit" className="add-btn">
  <Plus size={20} />
  <span>Ekle</span>
</button>
```

### Task 3: Refactor `Header.tsx` and `App.tsx` for Logout

**Files:**
- Modify: `src/web/src/components/Header.tsx`
- Modify: `src/web/src/App.tsx`

- [ ] **Step 1: Update Header to accept props**
- [ ] **Step 2: Add Logout button to Header with LogOut icon**
- [ ] **Step 3: Update App.tsx to pass isAuthenticated and onLogout**
- [ ] **Step 4: Remove absolute-positioned logout button from App.tsx**

### Task 4: Polish Styling in `App.css`

**Files:**
- Modify: `src/web/src/App.css`

- [ ] **Step 1: Adjust `.delete-btn` for icon-only display**
- [ ] **Step 2: Adjust `.add-btn` for icon+text alignment**
- [ ] **Step 3: Style the logout button within header**

### Task 5: Final Verification and Commit

- [ ] **Step 1: Verify all icons display correctly**
- [ ] **Step 2: Verify logout functionality still works**
- [ ] **Step 3: Commit all changes**
