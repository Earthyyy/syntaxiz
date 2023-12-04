import { create } from "zustand";

type State = {
  data: any;
};

type Action = {
  updateData: (data: any) => void;
};

const useDataStore = create<State & Action>((set) => ({
  data: [],
  updateData: (data) => set({ data }),
}));

export default useDataStore;
