import { Acceptance } from "@/src/interface";
import { create } from "zustand";

interface AcceptanceProps {
    acceptance: Acceptance | null;
    setAcceptance: (data: Acceptance | null) => void;
    clear: () => void;
}

export const useAcceptanceStore = create<AcceptanceProps>((set) => ({
    acceptance: null,
    setAcceptance: (data) => set({ acceptance: data }),
    clear: () => set({ acceptance: null }),
}));