import { useState } from "react";
import { useCats } from "../hooks/useCats";
import { useFavorites } from "../hooks/useFavorites";
import { Cat } from "../types/cat";
import { BreedFilter } from "../Components/BreedFilter";
import { CatCard } from "../Components/CatCard/CatCard";

export const CatGallery = () => {
  const [page, setPage] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { data: cats, isLoading, isError, error } = useCats(page, selectedBreed);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleBreedChange = (breedId: string) => {
    setSelectedBreed(breedId);
    setPage(1);
    setShowOnlyFavorites(false);
  };

  const filteredCats = showOnlyFavorites ? cats?.filter((cat) => isFavorite(cat.id)) : cats;

  if (isLoading) {
    return (
      <div className="text-center py-8 text-xl font-semibold text-gray-600">
        Loading adorable cats...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8 text-xl font-semibold">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BreedFilter selectedBreed={selectedBreed} onBreedChange={handleBreedChange} />

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-4 py-2 rounded-full ${
            showOnlyFavorites ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
          }`}>
          {showOnlyFavorites ? "Show All Cats" : "Show Favorites"}
        </button>
        <span className="text-gray-600">
          {showOnlyFavorites ? `Showing ${filteredCats?.length} favorite cats` : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCats?.map((cat: Cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            isFavorite={isFavorite(cat.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {!showOnlyFavorites && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-blue-600">
            Previous
          </button>
          <span className="text-lg font-medium text-gray-700">Page {page}</span>
          <button
            onClick={() => setPage((old) => old + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full transition-colors duration-300 hover:bg-blue-600">
            Next
          </button>
        </div>
      )}
    </div>
  );
};
