import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favoriteCats");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteCats", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (catId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(catId)
        ? prevFavorites.filter((id) => id !== catId)
        : [...prevFavorites, catId]
    );
  };

  const isFavorite = (catId: string) => favorites.includes(catId);

  return { favorites, toggleFavorite, isFavorite };
};
