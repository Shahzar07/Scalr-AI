
import { User } from '../types';

const STORAGE_KEY = 'scalr_users_prod_v1';

export const userService = {
  // Get all users (from local storage)
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with empty array for production
    return [];
  },

  // Save users state
  saveUsers: (users: User[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  },

  // Authenticate User
  login: (email: string): User | null => {
    const users = userService.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  // Register New User
  register: (name: string, email: string): User | string => {
    const users = userService.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return "Email already exists";
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      plan: 'Free',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now'
    };

    const updatedUsers = [...users, newUser];
    userService.saveUsers(updatedUsers);
    return newUser;
  },

  // Admin: Add User Manually
  addUser: (user: Omit<User, 'id' | 'joinedDate' | 'lastActive'>): void => {
    const users = userService.getUsers();
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };
    userService.saveUsers([...users, newUser]);
  },

  // Admin: Delete User
  deleteUser: (id: string): void => {
    const users = userService.getUsers();
    userService.saveUsers(users.filter(u => u.id !== id));
  },

  // Admin: Update User Plan/Status
  updateUser: (id: string, updates: Partial<User>): void => {
    const users = userService.getUsers();
    const updatedUsers = users.map(u => u.id === id ? { ...u, ...updates } : u);
    userService.saveUsers(updatedUsers);
  },

  // Admin: Nuke Database
  resetDatabase: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
