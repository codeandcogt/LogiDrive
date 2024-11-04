import { LoginSessionData } from "@/src/interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SessionStore {
  session: LoginSessionData | null;
  isAuthenticated: boolean;
  lastLogin: number | null;
  setSession: (data: LoginSessionData) => void;
  logout: () => void;
  checkSessionExpiry: () => void;
}

// 24 horas en milisegundos
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: null,
      isAuthenticated: false,
      lastLogin: null,

      setSession: (data: LoginSessionData) => 
        set({ 
          session: data,
          isAuthenticated: true,
          lastLogin: Date.now()
        }),

      logout: () => 
        set({ 
          session: null,
          isAuthenticated: false,
          lastLogin: null
        }),

      checkSessionExpiry: () => {
        const state = get();
        if (state.lastLogin && state.isAuthenticated) {
          const now = Date.now();
          const sessionAge = now - state.lastLogin;
          
          if (sessionAge >= SESSION_DURATION) {
            state.logout();
          }
        }
      }
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        session: state.session,
        isAuthenticated: state.isAuthenticated,
        lastLogin: state.lastLogin 
      }),
    }
  )
);

export const initSessionExpiryChecker = () => {
  setInterval(() => {
    useSessionStore.getState().checkSessionExpiry();
  }, 60 * 1000);
};