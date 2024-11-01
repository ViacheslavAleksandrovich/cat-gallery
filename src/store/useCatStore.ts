// useCatStore.ts
import { create } from "zustand";
import { CatApiResponse } from "../api/ApiInterface";

interface CatStore {
  cats: CatApiResponse[];
  addCat: (cat: CatApiResponse) => void;
  removeCat: (id: string) => void;
  clearCats: () => void;
}

const useCatStore = create<CatStore>((set) => ({
  cats: [],
  addCat: (cat: CatApiResponse) => set((state) => ({ cats: [...state.cats, cat] })),
  removeCat: (id: string) => set((state) => ({ cats: state.cats.filter((cat) => cat.id !== id) })),
  clearCats: () => set({ cats: [] }),
}));

export default useCatStore;
