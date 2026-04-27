# Design Spec: Frontend Icons and Polish

**Goal:** Improve the visual quality and user experience of the Terra Todo App by integrating Lucide icons and refining component layouts.

## Proposed Changes

### 1. `TodoItem.tsx`
- **Icon Integration:** Replace the "Sil" text in the delete button with the `Trash2` icon from `lucide-react`.
- **Layout Improvements:** 
    - Ensure the checkbox and title are vertically aligned.
    - Adjust the delete button styling to be more compact and visually consistent with an icon-only button.
    - Maintain the "hover to reveal" behavior for the delete button, but optimize it for better UX.

### 2. `AddTodoForm.tsx`
- **Icon Integration:** Add a `Plus` icon next to the "Ekle" text in the submit button.
- **Styling Refinement:** 
    - Improve the spacing between the icon and text.
    - Ensure the input field and button have consistent height and alignment.

### 3. `Header.tsx` & `App.tsx`
- **Logout Integration:** 
    - Move the Logout button logic from `App.tsx` into `Header.tsx`.
    - `Header.tsx` will now accept `isAuthenticated` and `onLogout` props.
    - Use the `LogOut` icon for the logout button.
    - Position the logout button within the Header (e.g., top right or next to the title) for a cleaner look.
- **Icon Integration:** Optionally add a todo-related icon next to the application title (e.g., `CheckCircle`).

## Architecture & Data Flow
- No changes to data flow. 
- Components remain functional and stateless where possible, receiving actions via props.

## Testing Strategy
- Manual verification of UI layout and responsiveness.
- Ensure all buttons remain functional after icon integration.
