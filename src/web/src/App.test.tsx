import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import todoService from './services/todoService';

// Mock components and modules
vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  GoogleLogin: () => <button>Login with Google</button>,
}));

vi.mock('./services/todoService', () => ({
  default: {
    getAllTodos: vi.fn(),
    createTodo: vi.fn(),
    toggleTodo: vi.fn(),
    deleteTodo: vi.fn(),
  },
}));

describe('App Component Frontend Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure localStorage is handled correctly in jsdom
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true
    });
  });

  it('renders login screen when not authenticated', () => {
    (window.localStorage.getItem as any).mockReturnValue(null);
    render(<App />);
    expect(screen.getByText(/Welcome to Terra/i)).toBeInTheDocument();
    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });

  it('renders main app content when authenticated', async () => {
    (window.localStorage.getItem as any).mockReturnValue('fake-token');
    (todoService.getAllTodos as any).mockResolvedValue([
      { id: '1', title: 'Test Todo', isCompleted: false, createdAt: new Date().toISOString() }
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Terra Todo/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
    });
  });

  it('can add a new todo', async () => {
    (window.localStorage.getItem as any).mockReturnValue('fake-token');
    (todoService.getAllTodos as any).mockResolvedValue([]);
    (todoService.createTodo as any).mockResolvedValue({
      id: '2', title: 'New Task', isCompleted: false, createdAt: new Date().toISOString()
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/Yeni bir görev ekle/i);
    const addButton = screen.getByRole('button', { name: /Ekle/i });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  it('can logout', async () => {
    (window.localStorage.getItem as any).mockReturnValue('fake-token');
    (todoService.getAllTodos as any).mockResolvedValue([]);

    render(<App />);

    const logoutButton = screen.getByTitle(/Çıkış Yap/i);
    fireEvent.click(logoutButton);

    expect(window.localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
