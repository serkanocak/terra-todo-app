# Design Spec: Frontend UI/UX Enhancements

**Date:** 2026-04-27
**Status:** Draft
**Topic:** Improving the visual appeal, interactivity, and usability of the React frontend.

## 1. Overview
We will transform the current basic UI into a polished, modern application. This includes a complete redesign of the Login screen, integration of professional icons, smooth animations, and enhanced todo management features like filtering.

## 2. Visual Design & Theme
-   **Style:** Modern Dark Mode (Slate & Indigo).
-   **Effects:** Glassmorphism (blur/transparency) for cards and login screens.
-   **Typography:** Maintain "Inter" but refine weights and spacing.
-   **Icons:** Use `lucide-react` for actions (Trash, Check, User, LogOut).

## 3. Component Updates

### 3.1 Login Screen (Redesign)
-   Move from inline styles to a dedicated CSS file/classes.
-   Add a background gradient or subtle pattern.
-   Refine the Google Login button container to match the theme.

### 3.2 Todo List & Items
-   **Animations:** Use `framer-motion` for `AnimatePresence`. Items will slide in/out when added or deleted.
-   **Filtering:** Add a "Tabs" component above the list: [All, Active, Completed].
-   **Empty State:** Show a friendly message and a Lucide icon when no tasks are present in the filtered view.

### 3.3 Layout & Navigation
-   **Logout:** Move the logout button to a more integrated position in the Header or a User Menu.
-   **Header:** Enhance with a subtle glass effect and better alignment.

## 4. Technical Changes
-   **Libraries:** `lucide-react`, `framer-motion`.
-   **CSS:** Update `App.css` with shared components and improved responsive design.

## 5. Success Criteria
- [ ] Login screen looks professional and matches the app theme.
- [ ] Tasks animate smoothly when added, toggled, or removed.
- [ ] Users can easily filter tasks by their completion status.
- [ ] Icons are used consistently for all actions.
- [ ] The app feels more "alive" and interactive.
