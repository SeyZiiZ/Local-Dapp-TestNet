import { create } from 'zustand';
import axios from 'axios';

const PORT = "http://localhost:3000";

export type User = {
  id: string;
  email: string;
  isWhitelisted: boolean;
  isAdmin: boolean;
};

type UserStore = {
  user: User | null;
  isConnected: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isConnected: false,
  isLoading: true,

  setUser: (user) => set({ user, isConnected: true }),

  fetchUser: async () => {
    try {
      const res = await axios.get(`${PORT}/user/me`, {
        withCredentials: true,
      });

      const userData = res.data;

      const formattedUser = {
        id: userData.sub || userData.id,
        email: userData.email,
        isWhitelisted: userData.isWhitelist,
        isAdmin: userData.isAdmin,
      };

      set({
        user: formattedUser,
        isConnected: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        user: null,
        isConnected: false,
        isLoading: false,
      });
    }
  },

  logout: () => set({
    user: null,
    isConnected: false,
  }),
}));