import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  isWhitelisted: boolean;
  isAdmin: boolean;
};

type UserStore = {
  user: User | null;
  isConnected: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isConnected: false,
  setUser: (user) => set({ user, isConnected: true }),
  logout: () => set({ user: null, isConnected: false }),
}));