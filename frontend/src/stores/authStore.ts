import { create } from 'zustand';
import axios from 'axios';
import { useUserStore } from './userStore'; // <-- Import ici

type AuthState = {
    user: any | null;
    isLoading: boolean;
    fetchUser: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    fetchUser: async () => {
        try {
            const res = await axios.get('http://localhost:3000/user/me', {
                withCredentials: true,
            });

            const userData = res.data;
            useUserStore.getState().setUser(userData);

            set({ user: userData, isLoading: false });
        } catch (err) {
            useUserStore.getState().logout();
            set({ user: null, isLoading: false });
        }
    },
}));