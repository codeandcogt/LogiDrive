import { Acceptance, DataScanner, ValuesReturn } from "@/src/interface";
import { create } from "zustand";

interface AcceptanceProps {
    acceptance: Acceptance | null;
    setAcceptance: (data: Acceptance | null) => void;
    clear: () => void;
    scanner: boolean;
    setScanner: (state: boolean)=>void;
    trip: DataScanner | null;
    setTrip: (state: DataScanner | null)=>void;
    data: ValuesReturn | null;
    setData: (state: ValuesReturn | null)=>void;
}

export const useAcceptanceStore = create<AcceptanceProps>((set) => ({
    acceptance: null,
    setAcceptance: (data) => set({ acceptance: data }),
    clear: () => set({ acceptance: null }),
    scanner: false,
    setScanner:(state) => set({ scanner: state }),
    trip: null,
    setTrip:(state) => set({ trip: state }),
    data: null,
    setData:(state) => set({ data: state }) 
}));