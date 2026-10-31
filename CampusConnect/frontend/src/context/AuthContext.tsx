import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Role } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (token: string, userData: Omit<AuthUser, 'token'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: Role | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('cc_token');
      const storedUser = localStorage.getItem('cc_user');

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({ ...parsedUser, token: storedToken });
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string, userData: Omit<AuthUser, 'token'>) => {
    const fullUser: AuthUser = { ...userData, token };
    localStorage.setItem('cc_token', token);
    localStorage.setItem('cc_user', JSON.stringify(userData));
    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        role: user ? user.role : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
