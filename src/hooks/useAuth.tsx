// src/hooks/useAuth.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import apiClient from '../api/apiClient'; // Import the apiClient

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>; // Make it async
  logout: () => void;
  // switchRole is a demo feature, we can leave it or adapt it later
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      
      if (data.success && data.token && data.user) {
        const loggedInUser: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          // These fields might not come from the login endpoint, so we can add defaults
          department: 'Unknown', 
          isActive: true,
          createdAt: new Date().toISOString()
        };
        
        setUser(loggedInUser);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

 return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};