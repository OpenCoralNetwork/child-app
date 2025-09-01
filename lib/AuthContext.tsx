import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name?: string;
  parentInfo?: {
    phone?: string;
    address?: string;
    emergencyContact?: string;
  };
  children?: Array<{
    id: string;
    name: string;
    birthDate: string;
    allergies?: string[];
    medicalInfo?: string;
    photo?: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isFirstLaunch: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'user',
  FIRST_LAUNCH: 'first_launch',
  AUTH_TOKEN: 'auth_token',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [storedUser, , authToken] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH),
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
      ]);

      // Always show onboarding for demo purposes
      // In production, remove this line
      setIsFirstLaunch(true);
      
      // Original logic (commented out for demo)
      // setIsFirstLaunch(firstLaunch === null);
      
      if (storedUser && authToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual authentication with backend
      // For now, simulate login
      let mockUser: User;
      
      if (email === 'demo@example.com' && password === 'demo123') {
        // デモユーザー用のモックデータ
        mockUser = {
          id: 'demo-user',
          email: 'demo@example.com',
          name: 'ゲストユーザー',
          parentInfo: {
            phone: '090-1234-5678',
            address: '東京都渋谷区',
            emergencyContact: '080-9876-5432',
          },
          children: [
            {
              id: 'demo-child-1',
              name: 'デモ太郎',
              birthDate: '2021-05-15',
              allergies: ['卵', 'ピーナッツ'],
              medicalInfo: 'アレルギー薬を常備',
              photo: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              id: 'demo-child-2',
              name: 'デモ花子',
              birthDate: '2019-08-20',
              allergies: [],
              medicalInfo: '',
              photo: 'https://images.pexels.com/photos/1912868/pexels-photo-1912868.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
          ],
        };
      } else {
        // 通常のユーザー
        mockUser = {
          id: '1',
          email,
          name: 'テストユーザー',
        };
      }

      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock_token');
      setUser(mockUser);
    } catch (error) {
      throw new Error('ログインに失敗しました');
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      // TODO: Implement actual registration with backend
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || '',
        name: userData.name,
        parentInfo: userData.parentInfo,
        children: userData.children,
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'mock_token');
      setUser(newUser);
    } catch (error) {
      throw new Error('登録に失敗しました');
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      ]);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) return;
      
      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error('ユーザー情報の更新に失敗しました');
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FIRST_LAUNCH, 'false');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isFirstLaunch,
    login,
    register,
    logout,
    updateUser,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}