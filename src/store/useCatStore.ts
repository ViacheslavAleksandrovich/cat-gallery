import { create } from "zustand";
import { CatApiResponse } from "../api/ApiInterface";

interface CatStore {
  cats: CatApiResponse[];
  favorites: string[];
  addCat: (cat: CatApiResponse) => void;
  removeCat: (id: string) => void;
  clearCats: () => void;
  toggleFavorite: (id: string) => void;
}

const useCatStore = create<CatStore>((set) => {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  return {
    cats: [],
    favorites: storedFavorites,
    addCat: (cat: CatApiResponse) => set((state) => ({ cats: [...state.cats, cat] })),
    removeCat: (id: string) =>
      set((state) => ({ cats: state.cats.filter((cat) => cat.id !== id) })),
    clearCats: () => set({ cats: [] }),
    toggleFavorite: (id: string) => {
      set((state) => {
        const isFavorite = state.favorites.includes(id);
        const newFavorites = isFavorite
          ? state.favorites.filter((favoriteId) => favoriteId !== id)
          : [...state.favorites, id];

        localStorage.setItem("favorites", JSON.stringify(newFavorites));

        return { favorites: newFavorites };
      });
    },
  };
});

export default useCatStore;
