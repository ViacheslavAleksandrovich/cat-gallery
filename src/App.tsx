import React, { useEffect, useState } from "react";
import useCatStore from "./store/useCatStore";
import { getCats } from "./api/axios";
import Filter from "./Components/Filter";
import CatCard from "./Components/CatCard";

const App: React.FC = () => {
  const { cats, addCat, favorites, toggleFavorite } = useCatStore();
  const [selectedBreed, setSelectedBreed] = useState<string>("All");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCats();
      data.forEach((cat) => addCat(cat));

      const uniqueBreeds = Array.from(
        new Set(data.flatMap((cat) => cat.breeds.map((breed) => breed.name)))
      );
      setBreeds(uniqueBreeds);
    };

    fetchCats();
  }, [addCat]);

  const filteredCats =
    selectedBreed === "All"
      ? cats
      : cats.filter((cat) => cat.breeds.some((breed) => breed.name === selectedBreed));

  const displayedCats = showFavorites
    ? filteredCats.filter((cat) => favorites.includes(cat.id))
    : filteredCats;

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto p-4 ">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Cats Gallery</h1>
          <p className="text-lg text-gray-600">A collection of adorable cats</p>
        </header>

        <Filter
          breeds={breeds}
          selectedBreed={selectedBreed}
          onBreedChange={setSelectedBreed}
          showFavorites={showFavorites}
          onToggleShowFavorites={() => setShowFavorites(!showFavorites)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedCats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              isFavorite={favorites.includes(cat.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
