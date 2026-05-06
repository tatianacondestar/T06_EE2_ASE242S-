import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { loginApi, registerApi } from '@/src/api/auth.api';

export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'current_user_session';

const storeSession = async (user: User) => {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {}
};

const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch {}
};

const getStoredSession = async (): Promise<User | null> => {
  try {
    const stored = await AsyncStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Restore session on app start
  useEffect(() => {
    getStoredSession().then((stored) => {
      if (stored) setUser(stored);
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginApi({ email, password });
      const rawRole = (response.user?.role ?? '').toUpperCase();
      const role: UserRole = rawRole === 'ADMIN' ? 'admin' : 'user';

      const sessionUser: User = {
        id: response.user.id,
        name: response.user.fullName,
        email: response.user.email,
        role,
      };

      await storeSession(sessionUser);
      setUser(sessionUser);
      setIsLoading(false);

      // Navigate based on role
      if (role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/home');
      }
      return true;
    } catch (err: any) {
      setError(err?.message ?? 'Error al iniciar sesión');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole = 'user'
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerApi({
        fullName: name,
        email,
        password,
        role: role.toUpperCase(),
      });
      const rawRole = (response.user?.role ?? '').toUpperCase();
      const resolvedRole: UserRole = rawRole === 'ADMIN' ? 'admin' : 'user';

      const sessionUser: User = {
        id: response.user.id,
        name: response.user.fullName,
        email: response.user.email,
        role: resolvedRole,
      };

      await storeSession(sessionUser);
      setUser(sessionUser);
      setIsLoading(false);

      if (resolvedRole === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/home');
      }
      return true;
    } catch (err: any) {
      setError(err?.message ?? 'Error al registrar usuario');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await clearSession();
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
