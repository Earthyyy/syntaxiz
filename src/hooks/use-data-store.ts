import { create } from "zustand";

type State = {
  data: string;
};

type Action = {
  updateData: (data: string) => void;
  resetData: () => void;
};

const useDataStore = create<State & Action>((set) => ({
  data: "",
  updateData: (data) => set({ data }),
  resetData: () => set({ data: "" }),
}));

export default useDataStore;
